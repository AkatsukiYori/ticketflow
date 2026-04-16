import { createColumnHelper } from "@tanstack/react-table";
import { DetailButton } from "../../../components/buttons/Button";
import { ActionDropdown } from "../../../components/actions/Actions";

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
    closed_at: Date;
}

const columnHelper = createColumnHelper<Ticket>();

export const columns = (
    onDetail: (id: number) => void,
    onReassign: (id: number, isReassign: boolean) => void,
    onFeedback: (id: number, mode: string) => void,
    onRemove: (id: number) => void,
    onReopen: (id: number) => void
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor(row => new Date(row.report_date), {
        id: "report_date",
        header: "Date",
        sortingFn: "datetime",
        cell: ({ getValue }) => {
            return getValue<Date>().toLocaleString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Jakarta"
            }).replaceAll(/\./g, ":");
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
            const statusStyle: React.CSSProperties = {
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                textAlign: "center",
                width: "100%"
            }
            const getStatus = () => {
                return data.status == "completed" && data.closed_at ?
                    <span style={{ ...statusStyle, backgroundColor: "#dfdfdf" }}>Closed</span>
                : data.status === "pending" ?
                    <span style={{ ...statusStyle, backgroundColor:"#FEF08A" }} >Pending</span>
                : data.status === "on_progress" ?
                    <span style={{ ...statusStyle, backgroundColor:"#FFD6A5" }} >On Progress</span>
                : data.status === "completed" ?
                    <span style={{ ...statusStyle, backgroundColor:"#BBF7D0" }} >Feedback</span>
                : data.status === "reject" ?
                    <span style={{ ...statusStyle, backgroundColor:"#FECACA" }} >Reject</span>
                :
                    <></>
            }
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {getStatus()}
                </div>
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
            return user ? <span style={{ backgroundColor: "#DBEAFE", padding: "8px", borderRadius: "8px", fontSize: "12px", color: "#1E40AF" }}>{user.username}</span>
            : <span style={{ backgroundColor: "#F3F4F6", padding: "8px", borderRadius: "8px", fontSize: "12px", color: "#4B5563" }}>Not Assigned</span>
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
                    <ActionDropdown
                        onAssign={() => onReassign(data.id, true)}
                        onReject={() => onFeedback(data.id, "reject")}
                        onComplete={() => onFeedback(data.id, "feedback")}
                        onRemove={() => onRemove(data.id)}
                        onReopen={() => onReopen(data.id)}
                        isClosed={data.closed_at ? true : false}
                    />
                </div>
                : 
                <div className="table-actions">
                    <DetailButton onClick={() => onDetail(data.id)} />
                    <ActionDropdown
                        onAssign={() => onReassign(data.id, false)}
                        onReject={() => onFeedback(data.id, "reject")}
                        onComplete={() => onFeedback(data.id, "feedback")}
                        onRemove={() => onRemove(data.id)}
                        onReopen={() => onReopen(data.id)}
                        isClosed={data.closed_at ? true : false}
                    />
                </div>
            );
        }
    })
];