import { InputText } from "../../../components/inputs/Input.tsx";
import { Buttons } from "../../../components/buttons/Button.tsx";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Notifications } from "../../../components/notifications/notification.tsx";
import { useApi } from "../../../hooks/useApi.ts";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column.tsx";
import DataTables from "../../../components/datatables/DataTable.tsx";

import LogsModal from "../../../components/modals/logs/ViewLogs.tsx";
import { socket } from "../../../api/socket.ts";

export default function Category() {
    const { callApi } = useApi();

    const [open, setOpen] = useState(false);

    const [dataTicket, setDataTicket] = useState<any[]>([]);
    const [ticketID, setTicketID] = useState(0);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const fetchTicket = useCallback(async () => {
        try {
            const res = await callApi("get", "/tickets/get-all-ticket-logs");
            setDataTicket(res);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, []);

    function handleLogs(ticket_id: number) {
        setTicketID(ticket_id);
        setOpen(true);
    }

    useEffect(() => {
        fetchTicket();

        socket.on("ticket-change", () => {
            fetchTicket();
        });

        return () => {
            socket.off("ticket-change");
        }
    }, [fetchTicket]);

    const getColumns = useMemo(() => columns(handleLogs), []);
    const table = useReactTable({
        data: dataTicket,
        columns: getColumns,
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
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
            <section className={Styles['top-table']}>
                <section className={Styles['filter']}>
                    <InputText
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Ticket No..."
                        value={( table.getColumn("ticket_no")?.getFilterValue() as string )}
                        onChangeInput={(e) => table.getColumn("ticket_no")?.setFilterValue(e.target.value)} />
                    <Buttons label="" func="refresh" btnTitle="Refresh" onClick={() => fetchTicket()} />
                </section>
            </section>
            <section className={Styles['table-container']}>
                <DataTables
                    table={table}
                />
            </section>
            
            {open && (
                <LogsModal open={open} onClose={() => setOpen(false)} ticketId={ticketID} />
            )}
        </section>

    );
}