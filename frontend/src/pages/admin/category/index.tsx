import { useState, useEffect, useMemo, useCallback } from "react";
import { columns } from "./columns.tsx";
import { InputText } from "../../../components/inputs/Input.tsx";
import { Buttons } from "../../../components/buttons/Button.tsx";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useApi } from "../../../hooks/useApi.ts";
import { socket } from "../../../api/socket.ts";

import DataTables from "../../../components/datatables/DataTable";
import CategoryModal from "../../../components/modals/category/CategoryModal.tsx";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal.tsx";
import { Notifications } from "../../../components/notifications/notification.tsx";

import Styles from "../../../css/layouts/admin/layouts.module.css";

export default function Category() {
    // Ope Modal
    const { callApi } = useApi();
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Mode (new / edit) (untuk modal yang sama antara new dan edit)
    const [mode, setMode] = useState<"create" | "edit">("create");

    // Data
    const [selected, setSelected] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [deleteID, setDeleteID] = useState<number | null>(null);
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});

    // Filter
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchCategories = useCallback(async () => {
        try {
            const result = await callApi("get", "/categories/get-all-categories");
            setData(result);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    useEffect(() => {
        fetchCategories();
        socket.on("category-change", () => {
            fetchCategories();
        });

        return () => {
            socket.off("category-change");
        }
    }, [fetchCategories]);

    async function handleSubmit(data: any) {
        try {
            const res = await callApi("post", `/categories/new-categories`, data);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpen(false);
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Please fill in all required fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    }

    async function handleUpdate(data: any) {
        try {
            const res = await callApi("put", `/categories/update-categories/${data.id}`, data);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpen(false);
            setFieldError({});
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName  = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Please fill in all required fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    }

    async function handleDelete(id: number) {
        if(!id) return;

        try {
            const res = await callApi("put", `/categories/delete-categories/${id}`);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setConfirmOpen(false);
            setDeleteID(null);
        } catch (error: any) {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
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
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });
    
    return (
        <section className={Styles['main-content']}>
            <section className={Styles['content-header']}>
                <section className={Styles['filter']}>
                    <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                    <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => fetchCategories()} />
                </section>
                <section>
                    <Buttons label="New Category" func="add-desktop" onClick={handleModalCreate} btnTitle="New Category" />
                    <Buttons label="" func="add-mobile" onClick={handleModalCreate} btnTitle="New Category" />
                </section>
            </section>
            <section className={Styles['content-body']}>
                <DataTables
                    table={table}
                />
            </section>

            <CategoryModal open={open} mode={mode} data={selected} onClose={() => {setOpen(false); setFieldError({})}} onSubmit={handleSubmit} onUpdate={handleUpdate} validation={fieldError} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => deleteID && handleDelete(deleteID)} isTicket={false} message="Deleted data is permanent and cannot be retrieved!" label="Are you sure?" btnCancel="Cancel" btnYes="Yes" />
        </section>
    );
}