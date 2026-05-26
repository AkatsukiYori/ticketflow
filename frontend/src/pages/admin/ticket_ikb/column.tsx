import { createColumnHelper } from "@tanstack/react-table";
import { Buttons } from "../../../components/buttons/Button";
import { ActionDropdown } from "../../../components/actions/Actions";

type Ticket = {
    id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    category_id: number;
    priority: string;
    report_date: Date;
    location: string;
    status: string;
    assign_to?: number;
    fk_users_id?: {
        id: number;
        username: string;
        role: string;
    }
    member_id?: number;
    fk_member?: {
        username: string;
    }
    closed_at: Date;
    ikb_status_point: string;
}

const columnHelper = createColumnHelper<Ticket>();

export const columns = (
    onDetail: (id: number) => void,
    onReassign: (id: number, isReassign: boolean) => void,
    onFeedback: (id: number, mode: string) => void,
    onRemove: (id: number) => void,
    onReopen: (id: number) => void,
    onEdit: (id: number) => void,
    userRole: string
) => [
    columnHelper.display({
        id: "no",
        header: "No",
        size: 10,
        cell: ({ row }) => row.index + 1
    }),
    columnHelper.accessor(row => new Date(row.report_date), {
        id: "report_date",
        header: "Date",
        sortingFn: "datetime",
        size: 50,
        cell: ({ getValue }) => {
            return getValue<Date>().toLocaleString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Jakarta"
            });
        }
    }),
    columnHelper.accessor("ticket_no", {
        header: "Ticket No",
        size: 100
    }),
    columnHelper.accessor("ticket_title", {
        header: "Ticket Title",
        size: 100
    }),
    columnHelper.accessor("status", {
        header: "Status",
        size: 60,
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
    columnHelper.accessor("ikb_status_point", {
        header: "Status Point",
        size: 60,
        cell: ({ row }) => {
            const data = row.original;
            const statusPointStyle: React.CSSProperties = {
                padding: "8px",
                borderRadius: "8px",
                fontSize: "12px"
            }
            const getStatusPoint = () => {
                return data.ikb_status_point === "additional" ?
                    <span style={{ ...statusPointStyle, backgroundColor:"#BBF7D0" }}>Additional</span>
                : data.ikb_status_point === "bugs" ?
                    <span style={{ ...statusPointStyle, backgroundColor:"#a1c6eb" }}>Bugs</span>
                : <span style={{ ...statusPointStyle, backgroundColor: "#F3F4F6", color: "#4B5563" }}>Not Set</span>
            }
            return (
                <>
                    {getStatusPoint()}
                </>
            );
        }
    }),
    columnHelper.accessor("problem", {
        header: "Problem",
        size: 400,
        cell: ({ row }) => {
            const data = row.original.problem;
            return (
                <>
                    <span style={{ textAlign: "left" }}>{data}</span>
                </>
            )
        }
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: ({ row }) => {
            const data = row.original;
            return (
                data.assign_to ? 
                <div className="table-actions">
                    <Buttons label="" func="detail" btnTitle="Detail" onClick={() => onDetail(data.id)} />
                    <ActionDropdown
                        onAssign={() => onReassign(data.id, true)}
                        onReject={() => onFeedback(data.id, "reject")}
                        onComplete={() => onFeedback(data.id, "feedback")}
                        onRemove={() => onRemove(data.id)}
                        onReopen={() => onReopen(data.id)}
                        isClosed={data.closed_at ? true : false}
                        isAssign={data.assign_to ? true : false}
                        userRole={userRole}
                        onEdit={() => onEdit(data.id)}
                    />
                </div>
                : 
                <div className="table-actions">
                    <Buttons label="" func="detail" btnTitle="Detail" onClick={() => onDetail(data.id)} />
                    <ActionDropdown
                        onAssign={() => onReassign(data.id, false)}
                        onReject={() => onFeedback(data.id, "reject")}
                        onComplete={() => onFeedback(data.id, "feedback")}
                        onRemove={() => onRemove(data.id)}
                        onReopen={() => onReopen(data.id)}
                        isClosed={data.closed_at ? true : false}
                        isAssign={data.assign_to ? true : false}
                        userRole={userRole}
                        onEdit={() => onEdit(data.id)}
                    />
                </div>
            );
        }
    })
];