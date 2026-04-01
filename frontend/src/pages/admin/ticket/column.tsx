import { createColumnHelper } from "@tanstack/react-table";
import { DetailButton, IconAssignButton } from "../../../components/buttons/Button";

type Ticket = {
    id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    user: string;
    category_id: number;
    priority: string;
    report_date: Date;
    department: string;
    location: string;
    status: string;
    assign_to?: number;
    fk_users_id?: {
        id: number;
        username: string;
    }
}

const columnHelper = createColumnHelper<Ticket>();

export const columns = (
    onDetail: (id: number) => void,
    onAssign: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        cell: ({ row, table }) => row.index + 1
    }),
    columnHelper.accessor(row => new Date(row.report_date), {
        id: "report_date",
        header: "Date",
        sortingFn: "datetime",
        cell: ({ getValue }) => {
            return getValue<Date>().toLocaleString();
        }
    }),
    columnHelper.accessor("ticket_no", {
        header: "Ticket No",
    }),
    columnHelper.accessor("ticket_title", {
        header: "Ticket Title",
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;
            const wordUpperCase = data.status.charAt(0).toUpperCase() + data.status.slice(1);
            return (
                <span>{wordUpperCase.replace("_", " ")}</span>
            );
        }
    }),
    columnHelper.accessor("user", {
        header: "User",
    }),
    columnHelper.accessor("assign_to", {
        header: "PIC",
        cell: ({ row }) => {
            const user = row.original.fk_users_id;
            return user ? user.username : <span style={{ backgroundColor: "red", padding: "8px", borderRadius: "8px", fontSize: "11px", color: "white", fontWeight: "bold" }}>Not Assigned</span>
        }
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;
            return (
                data.assign_to ? 
                <div className="table-actions">
                    <DetailButton onClick={() => onDetail(data.id)} />
                </div>
                : 
                <div className="table-actions">
                    <DetailButton onClick={() => onDetail(data.id)} />
                    <IconAssignButton onClick={() => onAssign(data.id)} />
                </div>
            );
        }
    })
];