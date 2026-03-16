import { useState, useEffect, useMemo } from "react";
import { columns } from "./columns.tsx";
import { InputText, SelectOptions } from "../../../components/inputs/Input.tsx";
import { createCategories, getCategories, updateCategories, deleteCategories } from "../../../api/categoryApi.ts";
import { NewButton, RefreshButton } from "../../../components/buttons/Button.tsx";
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

import DataTables from "../../../components/datatables/DataTable";
import CategoryModal from "../../../components/modals/category/CategoryModal.tsx";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal.tsx";
import { SuccessNotification, ErrorNotification } from "../../../components/notifications/notification.tsx";

export default function Category() {
    // Ope Modal
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Mode (new / edit) (untuk modal yang sama antara new dan edit)
    const [mode, setMode] = useState<"create" | "edit">("create");

    // Data
    const [selected, setSelected] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    // Filter
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const res = await getCategories();
            setData(res.data);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    async function handleSubmit(data: any) {
        try {
            await createCategories(data);

            SuccessNotification({ message: "Category successful created.", variantType: "success", persist: false });
            fetchCategories();
            setOpen(false);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    async function handleUpdate(data: any) {
        try {
            await updateCategories(data.id, {
                name: data.name
            });

            SuccessNotification({ message: "Category successful updated.", variantType: "success", persist: false });
            fetchCategories();
            setOpen(false);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    async function handleDelete(id: number) {
        if(!id) return;

        try {
            await deleteCategories(id);
            SuccessNotification({ message: "Category successful deleted.", variantType: "success", persist: false });
            fetchCategories();
            setConfirmOpen(false);
            setDeleteID(null);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    function handleModalCreate() {
        setMode("create");
        setSelected(null);
        setOpen(true);
    }

    function handleModalUpdate(row: any) {
        setMode("edit");
        setSelected(row);
        setOpen(true);
    }

    function handleModalDelete(id: number) {
        setConfirmOpen(true);
        setDeleteID(id);
    }

    const getColumns = useMemo(() => columns(handleModalUpdate, handleModalDelete), []);
    const table = useReactTable({
        data,
        columns: getColumns,
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });
    
    return (
        <div>
            <div className="filter" style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputText name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                    <RefreshButton onClick={() => fetchCategories()} />
                </section>
                <section>
                    <NewButton label="Category" func="add" onClick={handleModalCreate}></NewButton>
                </section>
            </div>
            <DataTables
                table={table}
            />

            <CategoryModal open={open} mode={mode} data={selected} onClose={() => setOpen(false)} onSubmit={handleSubmit} onUpdate={handleUpdate} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => deleteID && handleDelete(deleteID)} isDeleted={true} />
        </div>
    );
}