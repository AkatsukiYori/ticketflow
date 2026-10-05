// import { createColumnHelper } from "@tanstack/react-table";
// import Styles from "../../../components/datatables/datatable.module.css";

// type kpi = {
//     id: number;
//     fk_ticket_id: {
//         id: number;
//         ticket_no: string;
//         ticket_title: string;
//         status: string;
//         report_date: Date;
//         closed_at: Date;
//     }
//     fk_users_id: {
//         id: number;
//         username: string;
//         role: string;
//     }
//     closed_at: Date;
// }

// const columnHelper = createColumnHelper<kpi>();

// export const kpiColumns = (
//     onUnregister: (kpi: number) => void
// ) => [
//     columnHelper.display({
//         header: "Action",
//         size: 10,
//         cell: ({ row }) => {
//             const data = row.original;

//             return (
//                 <div>
//                     <input
//                            type="checkbox"
//                            id="register_ticket"
//                            className={Styles['checkbox']}
//                            onChange={(e) => {
//                                const checked = e.target.checked;
                               
//                                if(checked) {
//                                    onUnregister(data.id)
//                                }
//                            }}
//                        />
//                 </div>
//             )
//         }
//     }),
//     columnHelper.accessor(row => new Date(row.fk_ticket_id.report_date), {
//         id: "report_date",
//         header: "Date",
//         sortingFn: "datetime",
//         cell: ({ getValue }) => {
//             return getValue<Date>().toLocaleString("en-US", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//                 timeZone: "Asia/Jakarta"
//             });
//         }
//     }),
//     columnHelper.display({
//         id: "ticket_no",
//         header: "Ticket No",
//         cell: ({ row }) => {
//             return row.original.fk_ticket_id.ticket_no;
//         }
//     }),
//     columnHelper.display({
//         id: "ticket_title",
//         header: "Ticket Title",
//         cell: ({ row }) => {
//             return row.original.fk_ticket_id.ticket_title
//         }
//     }),
//     columnHelper.display({
//         header: "Status",
//         cell: ({ row }) => {
//             const data = row.original.fk_ticket_id;
//             const statusStyle: React.CSSProperties = {
//                 padding: "6px 12px",
//                 borderRadius: "8px",
//                 fontSize: "12px",
//                 textAlign: "center",
//                 width: "100%"
//             }
//             const getStatus = () => {
//                 return data.status == "completed" && data.closed_at ?
//                     <span style={{ ...statusStyle, backgroundColor: "#dfdfdf" }}>Closed</span>
//                 : data.status === "pending" ?
//                     <span style={{ ...statusStyle, backgroundColor:"#FEF08A" }} >Pending</span>
//                 : data.status === "on_progress" ?
//                     <span style={{ ...statusStyle, backgroundColor:"#FFD6A5" }} >On Progress</span>
//                 : data.status === "completed" ?
//                     <span style={{ ...statusStyle, backgroundColor:"#BBF7D0" }} >Feedback</span>
//                 : data.status === "reject" ?
//                     <span style={{ ...statusStyle, backgroundColor:"#FECACA" }} >Reject</span>
//                 :
//                     <></>
//             }
//             return (
//                 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
//                     {getStatus()}
//                 </div>
//             );
//         }
//     })
// ];