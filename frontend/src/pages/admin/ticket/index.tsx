import { use, useEffect, useMemo, useState } from "react";
import { RefreshButton } from "../../../components/buttons/Button";
import DataTables from "../../../components/datatables/DataTable";
import { InputText, SelectOptions } from "../../../components/inputs/Input";
import { ErrorNotification } from "../../../components/notifications/notification";
import { getTicket, getTicketById } from "../../../api/ticketApi";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./column";
import TicketDetailModal from "../../../components/modals/ticketDetail/TicketDetail";
import ConfirmModal from "../../../components/modals/confirmModal/ConfirmModal";

export default function Ticket() {
    const [data, setData] = useState<any[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [open, setOpen] = useState(false);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [ticketDetail, setTicketDetail] = useState<any[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        fetchTicket();

        if(!ticketId) return;
        fetchTicketById(ticketId);
    }, [ticketId]);

    async function fetchTicketById(id: number) {
        try {
            const res = await getTicketById(id);
            setTicketDetail(res.data);
        } catch (error) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    async function fetchTicket() {
        try {
            const res = await getTicket();
            setData(res.data);
        } catch (error) {
            ErrorNotification({ message: "Someting Went Wrong.", variantType: "error" });
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

    const getColumns = useMemo(() => columns(handleModalDetail, handleModalAssign), []);
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
        <div>
            <div className="filter" style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                <section style={{ display: "flex", gap: "10px" }}>
                    <InputText name="search" id="search" placeholder="No ticket..." value={( table.getColumn("ticket_no")?.getFilterValue() as string) } onChangeInput={(e) => table.getColumn("ticket_no")?.setFilterValue(e.target.value) } />
                    <InputText name="search" id="search" placeholder="Ticket title..." value={( table.getColumn("ticket_title")?.getFilterValue() as string) } onChangeInput={(e) => table.getColumn("ticket_title")?.setFilterValue(e.target.value) } />
                    <SelectOptions
                        label="Filter status"
                        options={[
                            { label: "Pending", value: "pending" },
                            { label: "On Progress", value: "on_progress" },
                            { label: "Completed", value: "completed" },
                            { label: "Reject", value: "reject" }
                        ]}
                        onChangeSelect={(e) => 
                            table.getColumn("status")?.setFilterValue(e.target.value) 
                        } />
                    <RefreshButton onClick={() => fetchTicket()} />
                </section>
            </div>
            <DataTables
                table={table}
            />

            <TicketDetailModal open={open} data={ticketDetail} onClose={() => setOpen(false)} />
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} isDeleted={false} data={ticketDetail} />
        </div>
    );
}