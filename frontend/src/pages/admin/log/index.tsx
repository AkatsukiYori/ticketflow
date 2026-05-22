import { InputText } from "../../../components/inputs/Input.tsx";
import { Buttons } from "../../../components/buttons/Button.tsx";

import Styles from "../../../css/layouts/admin/layouts.module.css";
import { useMemo, useState } from "react";
import { useApi } from "../../../hooks/useApi.ts";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column.tsx";
import DataTables from "../../../components/datatables/DataTable.tsx";

import LogsModal from "../../../components/modals/log/ViewLogs.tsx";
import { useQuery } from "@tanstack/react-query";

export default function Log() {
    const { callApi } = useApi();

    // Modal
    const [open, setOpen] = useState(false);

    // Data
    const [ticketId, setTicketId] = useState<number | null>(null);

    // Filters
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const fetchTicket = async () => {
        return await callApi("get", "/tickets/get-all-ticket-logs");
    };

    const { data = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['ticket-logs'],
        queryFn: fetchTicket,
        refetchOnWindowFocus: true,
        staleTime: Infinity
    });

    function handleLogs(id: number) {
        setOpen(true);
        setTicketId(id);
    }

    const getColumns = useMemo(() => columns(handleLogs), []);
    const table = useReactTable({
        data,
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
        <>
            <section className={Styles['main-content']}>
                <section className={Styles['content-header']}>
                    <section className={Styles['filter']}>
                        <InputText
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Ticket No..."
                            value={( table.getColumn("ticket_no")?.getFilterValue() as string )}
                            onChangeInput={(e) => table.getColumn("ticket_no")?.setFilterValue(e.target.value)} />
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
            
            {open && (
                <LogsModal open={open} onClose={() => setOpen(false)} ticketId={ticketId ?? undefined} />
            )}
        </>
    );
}