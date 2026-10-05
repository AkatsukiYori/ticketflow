import Styles from "../../../css/layouts/admin/layouts.module.css";
import { InputText } from "../../../components/inputs/Input";
import { Buttons } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { useCallback, useMemo, useState } from "react";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import MemberModal from "../../../components/modals/users/MemberModal";
import { columns } from "./column";
import { useApi } from "../../../hooks/useApi";
import { Notifications } from "../../../components/notifications/notification";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Members() {
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

    const fetchUsers = useCallback(async () => {
        try {
            return await callApi("get", "/members/get-all-members");
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false })
        }
    }, [callApi]);

    const { data = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    function handleModalCreate() {
        setMode("create");
        setSelected("");
        setOpen(true);
        setFieldError({});
    }

    function handleModalUpdate(row: any) {
        setMode("edit");
        setSelected(row);
        setOpen(true);
        setFieldError({});
    }

    function handleModalDelete(id: number) {
        setConfirmOpen(true);
        setDeleteID(id);
    }

    const hanldeSubmitMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("post", `/members/new-members`, data);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['users']
            })

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
    })

    function handleSubmit(data: any) {
        hanldeSubmitMutation.mutate(data);
    }

    const handleUpdateMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("put", `/members/update-members/${data.id}`, data);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['users']
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
    })

    function handleUpdate(data: any) {
        handleUpdateMutation.mutate(data);
    }

    const handleDeleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await callApi("put", `/members/delete-members/${id}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ['users']
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
                        <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => refetch()} />
                    </section>
                    <section>
                        <Buttons label="New User" func="add-desktop" btnTitle="New User" onClick={handleModalCreate} />
                        <Buttons label="" func="add-mobile" btnTitle="New User" onClick={handleModalCreate} />
                    </section>
                </section>
                <section className={Styles['content-body']}>
                    {isFetching && !isLoading && (
                        <section style={{ fontSize: "12px", marginBottom: "10px" }}>
                            Refreshing...
                        </section>
                    )}
                    <DataTables table={ table } />
                </section>
            </section>

            <MemberModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                onUpdate={handleUpdate}
                validation={fieldError}
            />
            <ConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => deleteID && handleDelete(deleteID)}
                isTicket={false}
                message="Deleted data is permanent and cannot be retrieved!"
                label="Are you sure?"
                btnCancel="Cancel"
                btnYes="Yes"
            />
        </>
    );
}