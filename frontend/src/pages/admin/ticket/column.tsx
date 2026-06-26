import { createColumnHelper } from "@tanstack/react-table";
import { Buttons } from "../../../components/buttons/Button";
import { ActionDropdown } from "../../../components/actions/Actions";
import { hasPermission } from "../../../permissions";
import { Permission } from "../../../permissions/permission";
import type { UserRole } from "../../../permissions/role";

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
}

const columnHelper = createColumnHelper<Ticket>();

export const columns = (
    onDetail: (id: number) => void,
    onReassign: (id: number, isReassign: boolean) => void,
    onFeedback: (id: number, mode: string) => void,
    onRemove: (id: number) => void,
    onReopen: (id: number) => void,
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
    columnHelper.accessor("member_id", {
        header: "User",
        cell: ({ row }) => {
            const member = row.original.fk_member;
            return member ?
                member.username :
                <span style={{ backgroundColor: "#F3F4F6", padding: "8px", borderRadius: "8px", fontSize: "12px", color: "#4B5563" }}>Missing User</span>
        }
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
        size: 60,
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
                        isIKB={false}
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
                        isIKB={false}
                    />
                </div>
            );
        }
    })
];