import { useCallback, useMemo, useState } from "react";
import { Buttons } from "../../../components/buttons/Button";
import { InputText } from "../../../components/inputs/Input";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./column";

import DataTables from "../../../components/datatables/DataTable";
import DocumentationModal from "../../../components/modals/documentation/DocumentationModal";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import { Notifications } from "../../../components/notifications/notification";

import { useApi } from "../../../hooks/useApi";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Documentation() {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    // Modal
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Mode
    const [mode, setMode] = useState<"create" | "edit">("create");

    // Data
    const [selected, setSelected] = useState<any>(null);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    // Validation
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});
    
    // Filter
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchDocumentation = useCallback(async () => {
        try {
            return await callApi("get", "/documentation/get-all-documentation");
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "info", persist: false });
        }
    }, [callApi]);

    const { data = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['documentation'],
        queryFn: fetchDocumentation,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true
    });

    const handleSubmitMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("post", `/documentation/new-documentation`, data);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['documentation']
            });

            setOpen(false);
            setFieldError({});
        },
        onError: (error: any) => {
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
    });

    function handleSubmit(data: any) {
        handleSubmitMutation.mutate(data);
    }

    const handleUpdateMutation = useMutation({
        mutationFn: async (data: any) => {
            const { id, attachment: {id: attachmentID}, ...rest } = data;
            const payload = {
                ...rest,
                attachmentID
            }
            return await callApi("put", `/documentation/update-documentation/${id}`, payload);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['documentation']
            });

            setOpen(false);
            setFieldError({});
        },
        onError: (error: any) => {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });
                
                setFieldError(formattedErrors);
                Notifications({ message: "Please fill missing columns.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    })

    function handleUpdate(data: any) {
        handleUpdateMutation.mutate(data);
    }

    const handleDeleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await callApi("delete", `/documentation/delete-documentation/${id}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['documentation']
            });

            setConfirmOpen(false);
            setDeleteID(null);
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    })

    function handleDelete(id: number) {
        if(!id) return;
        handleDeleteMutation.mutate(id);
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
        <>
            <section className={Styles['main-content']}>
                <section className={Styles['content-header']}>
                    <section className={Styles['filter']}>
                        <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                        <Buttons label="" func="refresh" onClick={() => refetch()} btnTitle="Refresh" />
                    </section>
                    <section>
                        <Buttons label="Documentation" func="add-desktop" onClick={handleModalCreate} btnTitle="New Documentation" />
                        <Buttons label="" func="add-mobile" onClick={handleModalCreate} btnTitle="New Documentation" />
                    </section>
                </section>
                <section className={Styles['content-body']}>
                    {isFetching && !isLoading && (
                        <section style={{ fontSize: "12px", marginBottom: "10px" }}>
                            Refreshing...
                        </section>
                    )}
                    <DataTables
                        table={table}
                    />
                </section>
            </section>
            
            <DocumentationModal open={open} mode={mode} data={selected} onClose={() => {setOpen(false); setFieldError({})}} onSubmit={handleSubmit} onUpdate={handleUpdate} validation={fieldError} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => deleteID && handleDelete(deleteID)} isTicket={false} message="Deleted data is permanent and cannot be retrieved!" label="Are you sure?" btnCancel="Cancel" btnYes="Yes" />
        </>
    );
}