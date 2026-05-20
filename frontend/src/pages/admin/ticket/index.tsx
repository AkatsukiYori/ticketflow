import { useCallback, useMemo, useState } from "react";
import { Buttons } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { InputText, SelectOptions } from "../../../components/inputs/Input";
import { Notifications } from "../../../components/notifications/notification";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column";
import TicketDetailModal from "../../../components/modals/ticketDetail/TicketDetail";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import ReassignModal from "../../../components/modals/reassign/ReassignTicket";
import ReopenModal from "../../../components/modals/reopen/ReopenModal";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useApi } from "../../../hooks/useApi";
import { FeedbackModal } from "../../../components/modals/feedback/FeedbackModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Ticket() {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    // Modal
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [reassignOpen, setReassignOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [reOpenModal, setReOpenModal] = useState(false);

    // Mode
    const [mode, setMode] = useState("");

    // Data
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [isAssign, setIsAssign] = useState(false);
    const [isReassign, setIsReassign] = useState(false);

    const username = localStorage.getItem("username") || "";
    const role = localStorage.getItem("role") || "";

    const fetchTicket = useCallback(async () => {
        try {
            return await callApi("get", `/tickets/get-all-ticket?status=${true}&role=${role}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi, role]);

    const fetchUser = useCallback(async () => {
        if(!username) return;
        try {
            return await callApi("get", `/users/get-user/${username}`);
        } catch(error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi, username]);

    const fetchTicketById = useCallback(async () => {
        if(!ticketId) return;
        try {
            return await callApi("get", `/tickets/get-ticket/${ticketId}`);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [ticketId, callApi]);

    const { data = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['ticket', role],
        queryFn: fetchTicket,
        refetchOnWindowFocus: true,
        staleTime: Infinity,
        enabled: !!role
    });

    const { data: userData } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
        refetchOnWindowFocus: true,
        staleTime: Infinity,
        enabled: !!username
    });

    const { data: ticketDetail } = useQuery({
        queryKey: ['ticket-detail', ticketId],
        queryFn: fetchTicketById,
        refetchOnWindowFocus: true,
        staleTime: Infinity,
        enabled: !!ticketId
    });

    const userId = userData?.id || "";
    const userRole = userData?.role || "";
    const ticketNo = ticketDetail?.ticket_no || "";

    function handleModalDetail(id: number) {
        setTicketId(id);
        setOpen(true);
    }

    function handleModalReassign(id: number, isReassign: boolean) {
        setReassignOpen(true);
        setTicketId(id);
        setIsReassign(isReassign);
    }

    function handleFeedback(id: number, selectedMode: string) {
        setMode(selectedMode);
        setIsFeedbackOpen(true);
        setTicketId(id);
    }

    function handleModalConfirm(id: number) {
        setConfirmOpen(true);
        setTicketId(id);
        setIsAssign(false);
    }

    function handleModalReopen(id: number) {
        setReOpenModal(true);
        setTicketId(id);
    }

    const handleSubmitMutation = useMutation({
        mutationFn: async () => {
            return await callApi("put", `/tickets/re-open/${ticketNo}`);
        },
        onSuccess: (_res) => {
            Notifications({ message: "Re-open ticket successfully.", variantType: "success", persist: false });
            setReOpenModal(false);

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "", variantType: "error", persist: false });
        }
    })

    async function handleSubmit() {
        handleSubmitMutation.mutate();
    }

    const getColumns = useMemo(() => columns(
        handleModalDetail,
        handleModalReassign,
        handleFeedback,
        handleModalConfirm,
        handleModalReopen,
        userRole
    ), [userRole]);

    const table = useReactTable({
        data,
        columns: getColumns,
        state: {
            columnFilters,
            // sorting
        },
        onColumnFiltersChange: setColumnFilters,
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

    const filterOptions = [
        { label: "All Status", value: "" },
        { label: "Pending", value: "pending" },
        { label: "On Progress", value: "on_progress" },
        { label: "Completed", value: "completed" },
        { label: "Reject", value: "reject" }
    ];

    return (
        <section className={Styles['main-content']}>
            <section className={Styles['conetent-header']}>
                <section className={Styles['filter']}>
                    <InputText type="text" name="search" id="search" placeholder="Ticket No..." value={( table.getColumn("ticket_no")?.getFilterValue() as string )} onChangeInput={(e) => table.getColumn("ticket_no")?.setFilterValue(e.target.value)} />
                    <InputText type="text" name="search" id="search" placeholder="Ticket title..." value={( table.getColumn("ticket_title")?.getFilterValue() as string) } onChangeInput={(e) => table.getColumn("ticket_title")?.setFilterValue(e.target.value) } />
                    <SelectOptions
                        name="filterInput"
                        id="filterInput"
                        placeholder="Filter Status"
                        searchAble={false}
                        value={table.getColumn("status")?.getFilterValue() as string}
                        options={filterOptions}
                        onChangeSelect={(e) => {
                            table.getColumn("status")?.setFilterValue(e ? e.value : undefined) 
                        }}
                    />
                    <section>
                        <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => refetch()} />
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

            <TicketDetailModal open={open} data={ticketDetail} onClose={() => setOpen(false)} userRole={userRole} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} isTicket={true} isAssign={isAssign} data={ticketDetail} label="Are you sure?" btnCancel="Cancel" btnYes="Yes" />
            <ReassignModal open={reassignOpen} onClose={() => setReassignOpen(false)} data={ticketDetail} isReassign={isReassign} userId={userId} />
            <FeedbackModal open={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} mode={mode} ticket={ticketDetail} userRole={userRole} />
            <ReopenModal open={reOpenModal} onClose={() => setReOpenModal(false)} data={ticketDetail} onClick={handleSubmit} />
        </section>
    );
}