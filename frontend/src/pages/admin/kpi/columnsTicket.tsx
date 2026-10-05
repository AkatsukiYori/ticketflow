// import { createColumnHelper } from "@tanstack/react-table";
// import Styles from "../../../components/datatables/datatable.module.css";

// type Ticket = {
//     id: number;
//     ticket_no: string;
//     ticket_title: string;
//     problem: string;
//     category_id: number;
//     priority: string;
//     report_date: Date;
//     location: string;
//     status: string;
//     member_id?: number;
//     assign_to?: number;
//     fk_member?: {
//         username: string;
//     }
//     closed_at: Date;
// }

// const columnHelper = createColumnHelper<Ticket>();

// export const ticketColumns = (
//     onRegister: (ticket: number, user: number) => void
// ) => [
//     columnHelper.display({
//         header: "Action",
//         size: 10,
//         cell: ({ row }) => {
//             const data = row.original;

//             return (
//                 <div>
//                     <input
//                         type="checkbox"
//                         id="register_ticket"
//                         className={Styles['checkbox']}
//                         onChange={(e) => {
//                             const checked = e.target.checked;
                            
//                             if(checked) {
//                                 onRegister(data.id, data.assign_to!)
//                             }
//                         }}
//                     />
//                 </div>
//             )
//         }
//     }),
//     columnHelper.accessor(row => new Date(row.report_date), {
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
//     columnHelper.accessor("ticket_no", {
//         header: "Ticket No",
//     }),
//     columnHelper.accessor("ticket_title", {
//         header: "Ticket Title",
//     }),
//     columnHelper.accessor("status", {
//         header: "Status",
//         cell: ({ row }) => {
//             const data = row.original;
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