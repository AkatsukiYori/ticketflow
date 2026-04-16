import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshButton } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { InputText, SelectOptions } from "../../../components/inputs/Input";
import { ErrorNotification, SuccessNotification } from "../../../components/notifications/notification";
import { getTicketById } from "../../../api/ticketApi";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column";
import TicketDetailModal from "../../../components/modals/ticketDetail/TicketDetail";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import ReassignModal from "../../../components/modals/reassign/ReassignTicket";
import ReopenModal from "../../../components/modals/reopen/ReopenModal";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useApi } from "../../../hooks/useApi";
import { socket } from "../../../api/socket";
import { FeedbackModal } from "../../../components/modals/feedback/FeedbackModal";

export default function Ticket() {
    const [data, setData] = useState<any[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [ticketDetail, setTicketDetail] = useState<any[]>([]);
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("username") || "";
    });
    const [userId, setUserId] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [ticketNo, setTicketNo] = useState("");

    const [isAssign, setIsAssign] = useState(false);

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [reassignOpen, setReassignOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [reOpenModal, setReOpenModal] = useState(false);
    const [mode, setMode] = useState("");
    const [isReassign, setIsReassign] = useState(false);

    const { callApi } = useApi();
    const fetchTicket = useCallback(async () => {
        try {
            const result = await callApi("get", `/tickets/get-all-ticket?status=${true}`);
            setData(result);
            setPageCount(result.length);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    const fetchUser = useCallback(async () => {
        if(!username) return;
        try {
            const result = await callApi("get", `/users/get-user/${username}`);
            setUserId(result.id);
        } catch(error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    const fetchTicketById = useCallback(async () => {
        if(!ticketId) return;
        try {
            const res = await callApi("get", `/tickets/get-ticket/${ticketId}`);
            setTicketDetail(res);
            setTicketNo(res.ticket_no);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [ticketId, callApi]);

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if(storedName) {
            setUsername(storedName);
        }
    }, []);

    useEffect(() => {
        fetchTicket();
        if(username) {
            fetchUser();
        }

        socket.on("ticket-change", () => {
            fetchTicket();
        });

        return () => {
            socket.off("ticket-change");
        }
    }, [fetchTicket, username, fetchUser]);

    useEffect(() => {
        if(ticketId) {
            fetchTicketById();
        }
    }, [ticketId, fetchTicketById]);

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

    async function handleSubmit() {
        try {
            await callApi("put", `/tickets/re-open/${ticketNo}`);
            SuccessNotification({ message: "Re-open ticket successfully.", variantType: "success" });
            setReOpenModal(false);
        } catch (error: any) {
            ErrorNotification({ message: "", variantType: "error" });
        }
    }

    const getColumns = useMemo(() => columns(
        handleModalDetail,
        handleModalReassign,
        handleFeedback,
        handleModalConfirm,
        handleModalReopen
    ), []);

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
    return (
        <section className={Styles['main-content']}>
            <section className={Styles['top-table']}>
                <section className={Styles['filter-ticket']}>
                    <InputText type="text" name="search" id="search" placeholder="No ticket..." value={( table.getColumn("ticket_no")?.getFilterValue() as string) } onChangeInput={(e) => table.getColumn("ticket_no")?.setFilterValue(e.target.value) } />
                    <InputText type="text" name="search" id="search" placeholder="Ticket title..." value={( table.getColumn("ticket_title")?.getFilterValue() as string) } onChangeInput={(e) => table.getColumn("ticket_title")?.setFilterValue(e.target.value) } />
                    <SelectOptions
                        label="Filter status"
                        name="filterInput"
                        id="filterInput"
                        options={[
                            { label: "Pending", value: "pending" },
                            { label: "On Progress", value: "on_progress" },
                            { label: "Completed", value: "completed" },
                            { label: "Reject", value: "reject" }
                        ]}
                        onChangeSelect={(e) => 
                            table.getColumn("status")?.setFilterValue(e.target.value) 
                        } />
                    <section>
                        <RefreshButton onClick={() => fetchTicket()} />
                    </section>
                </section>
            </section>
            <DataTables
                table={table}
            />

            <TicketDetailModal open={open} data={ticketDetail} onClose={() => setOpen(false)} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} isTicket={true} isAssign={isAssign} data={ticketDetail} label="Are you sure?" btnCancel="Cancel" btnYes="Yes" />
            <ReassignModal open={reassignOpen} onClose={() => setReassignOpen(false)} data={ticketDetail} isReassign={isReassign} userId={userId} />
            <FeedbackModal open={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} mode={mode} ticket={ticketDetail} />
            <ReopenModal open={reOpenModal} onClose={() => setReOpenModal(false)} data={ticketDetail} onClick={handleSubmit} />
        </section>
    );
}