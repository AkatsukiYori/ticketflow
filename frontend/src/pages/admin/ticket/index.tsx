import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshButton } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { InputText, SelectOptions } from "../../../components/inputs/Input";
import { ErrorNotification } from "../../../components/notifications/notification";
import { getTicket, getTicketById } from "../../../api/ticketApi";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column";
import TicketDetailModal from "../../../components/modals/ticketDetail/TicketDetail";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";
import ReassignModal from "../../../components/modals/reassign/ReassignTicket";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useApi } from "../../../hooks/useApi";
import { socket } from "../../../api/socket";

export default function Ticket() {
    const [data, setData] = useState<any[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [ticketDetail, setTicketDetail] = useState<any[]>([]);

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [reassignOpen, setReassignOpen] = useState(false);

    const { callApi } = useApi();
    const fetchTicket = useCallback(async () => {
        try {
            const result = await callApi("get", "/tickets/get-all-ticket");
            setData(result);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    useEffect(() => {
        fetchTicket();

        socket.on("ticket-change", () => {
            fetchTicket();
        });

        if(!ticketId) return;
        fetchTicketById(ticketId);

        return () => {
            socket.off("ticket-change");
        }
    }, [ticketId, fetchTicket]);

    async function fetchTicketById(id: number) {
        try {
            const res = await getTicketById(id);
            setTicketDetail(res.data);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    function handleModalDetail(id: number) {
        setTicketId(id);
        setOpen(true);
    }

    function handleModalAssign(id: number) {
        setConfirmOpen(true);
        setTicketId(id);
    }

    function handleModalReassign(id: number) {
        setReassignOpen(true);
        setTicketId(id);
    }

    const getColumns = useMemo(() => columns(handleModalDetail, handleModalAssign, handleModalReassign), []);
    const table = useReactTable({
        data,
        columns: getColumns,
        state: {
            columnFilters,
            // sorting
        },
        // onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
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
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} isTicket={true} data={ticketDetail} />
            <ReassignModal open={reassignOpen} onClose={() => setReassignOpen(false)} data={ticketDetail} />
        </section>
    );
}