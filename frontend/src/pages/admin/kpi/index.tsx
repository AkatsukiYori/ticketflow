import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useApi } from "../../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Notifications } from "../../../components/notifications/notification";
import DataTables from "../../../components/datatables/DataTable";
import { kpiColumns } from "./columns";
import { InputText } from "../../../components/inputs/Input";
import { Buttons } from "../../../components/buttons/Button";
import KpiModal from "../../../components/modals/kpi/KpiModal";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import KpiDetailModal from "../../../components/modals/kpiDetailModal/kpiDetailModal";

type RegisterPayload = {
    tickets: number[];
    kpiId: number;
    userId: number;
}

export default function KPI() {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selected, setSelected] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});
    const [selectedID, setSelectedID] = useState<number>(0);
    const [ticketSearch, setTicketSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [deleteID, setDeletedID] = useState<number | null>(null);

    const fetchKPI = useCallback(async () => {
        try {
            return await callApi("get", `/kpi/get-all-kpi`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: 'error', persist: false });
        }
    }, [callApi]);

    const fetchCheckTicket = useCallback(async (userId: number, ticketTitle?: string) => {
        try {
            return await callApi("get", `/kpi/check-tickets/${userId}?ticketTitle=${encodeURIComponent(ticketTitle ?? "")}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    const fetchTicketHasKpi = useCallback(async (kpiId: number, ticketTitle?: string) => {
        try {
            return await callApi("get", `/kpi/check-ticket-has-kpi/${kpiId}?ticketTitle=${encodeURIComponent(ticketTitle ?? "")}`)
        } catch (error: any) {
           Notifications({ message: "Failed to detch data.", variantType: "error", persist: false }); 
        }
    }, [callApi]);

    const fetchUser = useCallback(async () => {
        try {
            const username = localStorage.getItem("username");
            if(!username) return;

            return await callApi("get", `/users/get-user/${username}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    const { data = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ["kpi"],
        queryFn: fetchKPI,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const { data: unregisteredTickets = [] } = useQuery({
        queryKey: ["kpi", "unregistered-tickets", user?.id, debouncedSearch],
        queryFn: () => fetchCheckTicket(user.id, debouncedSearch),
        enabled: detailOpen && !!user?.id,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const { data: registeredTickets = [] } = useQuery({
        queryKey: ["kpi", "registered-tickets", selectedID, debouncedSearch],
        queryFn: () => fetchTicketHasKpi(selectedID, debouncedSearch),
        enabled: !!selectedID,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });

    const handleRegisterMutation = useMutation({
        mutationFn: async ({ tickets, kpiId, userId }: RegisterPayload) => {
            return await callApi("post", `/kpi/register-ticket/${kpiId}`, {tickets, userId});
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    const handleUnregisterMutation = useMutation({
        mutationFn: async (kpi_id: any) => {
            return await callApi("put", `/kpi/unregister-ticket/${kpi_id}`);
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ['kpi']
            });

            queryClient.invalidateQueries({
                queryKey: ["ticket"]
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleModalCreate() {
        setOpen(true);
        setMode("create");
        setSelected(null);
    }

    function handleModalUpdate(data: any) {
        setOpen(true);
        setMode("edit");
        setSelected(data);
    }

    function handleModalDelete(id: number) {
        setConfirmOpen(true);
        setDeletedID(id)
    }

    function handleModalDetail(id: number) {
        setDetailOpen(true);
        setSelectedID(id);
    }

    function handleRegister(tickets: number[]) {
        if(!selectedID || !user?.id) return;

        handleRegisterMutation.mutate({
            tickets,
            kpiId: selectedID,
            userId: user.id
        });
    }

    function handleUnregister(kpi_id: any) {
        handleUnregisterMutation.mutate(kpi_id);
    }

    function handleTicketSearch(ticketTitle: string) {
        setTicketSearch(ticketTitle);
    }

    const getColumns = useMemo(() => kpiColumns(handleModalUpdate, handleModalDelete, handleModalDetail), [handleModalUpdate, handleModalDelete, handleModalDetail]);
    
    const table = useReactTable({
        data: data ?? [],
        columns: getColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    const handleCreateMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("post", `/kpi/create`, data);
        },
        onSuccess: (res) => {
            Notifications({
                message: res.message,
                variantType: "success",
                persist: false
            });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
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
                Notifications({ message: "Please fill in all reqiired fields.", variantType: "info", persist: false });
            } else {
                Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
            }
        }
    });

    function handleCreate(data: any) {
        handleCreateMutation.mutate(data);
    }

    const handleUpdateMutation = useMutation({
        mutationFn: async (data: any) => {
            return await callApi("put", `/kpi/update/${data.id}`, data);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
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

    function handleUpdate (data: any) {
        handleUpdateMutation.mutate(data);
    }

    const handleDeleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await callApi("put", `/kpi/delete/${id}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });

            queryClient.invalidateQueries({
                queryKey: ["kpi"]
            });

            setConfirmOpen(false);
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleDelete (id: number)  {
        if(!id) return;
        handleDeleteMutation.mutate(id);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(ticketSearch);
        }, 300);

        return () => clearTimeout(timeout);
    }, [ticketSearch]);

    return (
        <>
            <section className={Styles['main-content']}>
                <section className={Styles['content-header']}>
                    <section className={Styles['filter']}>
                        <InputText type="text" name="search" id="search" placeholder="Search..." value={globalFilter ?? ""} onChangeInput={(e) => setGlobalFilter(e.target.value)} />
                        <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => refetch()} />
                    </section>
                    <section>
                        <Buttons label="New KPI Point" func="add-desktop" onClick={handleModalCreate} btnTitle="New KPI Point" />
                        <Buttons label="" func="add-mobile" onClick={handleModalCreate} btnTitle="New KPI Point" />
                    </section>
                </section>
                <section className={Styles['content-body']}>
                    {isFetching && !isLoading && (
                        <section style={{ fontSize: "12px", marginBottom: "10px" }}>
                            Refreshing...
                        </section>
                    )}
                    <div style={{ flex: '1', display: 'flex', flexDirection: "column", gap: "16px" }}>
                        <DataTables
                            table={table}
                        />
                    </div>
                </section>
            </section>

            <KpiModal
                open={open}
                mode={mode}
                data={selected}
                onClose={() => {
                    setOpen(false);
                }}
                onSubmit={handleCreate}
                onUpdate={handleUpdate}
                validation={(fieldError)}
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
            <KpiDetailModal
                open={detailOpen}
                kpiId={selectedID}
                onClose={() => setDetailOpen(false)}
                unregisterTickets={unregisteredTickets}
                registerTickets={registeredTickets}
                onRegister={handleRegister}
                onUnregister={handleUnregister}
                onSearch={handleTicketSearch}
            />
        </>
    );
}