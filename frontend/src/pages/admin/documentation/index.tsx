import { useCallback, useEffect, useMemo, useState } from "react";
import { NewButton, RefreshButton } from "../../../components/buttons/Button";
import { InputText } from "../../../components/inputs/Input";
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./column";

import DataTables from "../../../components/datatables/DataTable";
import DocumentationModal from "../../../components/modals/documentation/DocumentationModal";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import { ErrorNotification, InfoNotification, SuccessNotification } from "../../../components/notifications/notification";

import { useApi } from "../../../hooks/useApi";
import { socket } from "../../../api/socket";

import Styles from "../../../css/layouts/admin/layouts.module.css";

export default function Documentation() {
    const { callApi } = useApi();
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [mode, setMode] = useState<"create" | "edit">("create");

    const [data, setData] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [deleteID, setDeleteID] = useState<number | null>(null);
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});
    
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchDocumentation = useCallback(async () => {
        try {
            const result = await callApi("get", "/documentation/get-all-documentation");
            setData(result);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "info" });
        }
    }, [callApi]);

    useEffect(() => {
        fetchDocumentation();
        socket.on("documentation-change", () => {
            fetchDocumentation();
        });

        return () => {
            socket.off("documentation-change");
        }
    }, [fetchDocumentation]);


    async function handleSubmit(data: any) {
        try {
            const res = await callApi("post", `/documentation/new-documentation`, data);
            SuccessNotification({ message: res.message, variantType: "success", persist: false });
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
                InfoNotification({ message: "Please fill in all required fields.", variantType: "info" });
            } else {
                ErrorNotification({ message: "Something went wrong.", variantType: "error" });
            }
        }
    }

    async function handleUpdate(data: any) {
        try {
            const { id, ...payload } = data;
            const res = await callApi("put", `/documentation/update-documentation/${id}`, payload);
            SuccessNotification({ message: res.message, variantType: "success", persist: false });
            setOpen(false);
            setFieldError({});
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });
                
                setFieldError(formattedErrors);
                InfoNotification({ message: "Please fill missing columns.", variantType: "info" });
            } else {
                ErrorNotification({ message: "Something went wrong.", variantType: "error" });
            }
        }
    }

    async function handleDelete(id: number) {
        if(!id) return;

        try {
            const res = await callApi("delete", `/documentation/delete-documentation/${id}`);
            SuccessNotification({ message: res.message, variantType: "success", persist: false });
            setConfirmOpen(false);
            setDeleteID(null);
        } catch (error) {
            ErrorNotification({ message: "Something went wrong.", variantType: "error" });
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
        <section className={Styles['main-content']}>
            <section className={Styles['top-table']}>
                <section className={Styles['filter']}>
                    <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                    <RefreshButton onClick={() => fetchDocumentation()} />
                </section>
                <section>
                    <NewButton label="Documentation" func="add_desktop" onClick={handleModalCreate}></NewButton>
                    <NewButton label="" func="add_mobile" onClick={handleModalCreate}></NewButton>
                </section>
            </section>
            <DataTables
                table={table}
            />

            <DocumentationModal open={open} mode={mode} data={selected} onClose={() => {setOpen(false); setFieldError({})}} onSubmit={handleSubmit} onUpdate={handleUpdate} validation={fieldError} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => deleteID && handleDelete(deleteID)} isTicket={false} message="Deleted data is permanent and cannot be retrieved!" label="Are you sure?" btnCancel="Cancel" btnYes="Yes" />
        </section>
    );
}