import { createColumnHelper } from "@tanstack/react-table"

type Tickets = {
    ticket_no: string,
    ticket_title: string,
    report_date: Date,
    status: string,
    deleted_at: Date,
    closed_at: Date
}

const columnHelper = createColumnHelper<Tickets>();

export const columns = () => [
    columnHelper.accessor("ticket_no", {
        header: "Ticket No"
    }),
    columnHelper.accessor("ticket_title", {
        header: "Ticket Title"
    }),
    columnHelper.accessor(row => new Date(row.report_date), {
        id: "report_date",
        header: "Report Date",
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
                return data.deleted_at ?
                    <span style={{ ...statusStyle, backgroundColor: "#ffadad" }}>Deleted</span>
                : data.status == "completed" && data.closed_at ?
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
    })
]