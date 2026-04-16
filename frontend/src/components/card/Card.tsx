import Styles from "./card.module.css";
import { X, MessageCircleMore } from "lucide-react";

type Props = {
    data: any,
    onClickClosed: (ticketNo: string) => void;
    onClickResponse: (ticketNo: string) => void;
    onClickOpenTicket: (ticketNo: string) => void;
}

export default function Card({ data, onClickClosed, onClickResponse, onClickOpenTicket }: Props) {
    return (
        <div className={Styles['card']} style={{ width: "100%" }}>
            <div className={Styles['card-content']}>
                <div className={Styles['card-header']}>
                    <p style={{ fontSize: 14, margin: 0 }}>#{data.ticket_no} - {new Date(data.report_date).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta"
                    }).replaceAll(/\./g, ":").replaceAll(" pukul", ",")} - {data.user}</p>
                </div>
                <div className={Styles['card-body']}>
                    <div className={Styles['card-body-top']}>
                        <div>
                            <h3 style={{ marginBottom: 0, marginTop: 0 }}>{data.ticket_title} </h3>
                            {data.status === "completed" && data.closed_at ?
                                    <span style={{ backgroundColor: "#dfdfdf", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>Closed</span>
                                : data.status === "pending" ? 
                                    <span style={{ backgroundColor: "#FEF08A", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>Pending</span>
                                : data.status === "on_progress" ?
                                    <span style={{ backgroundColor: "#FFD6A5", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>On Progress</span>
                                : data.status === "completed" ?
                                    <span style={{ backgroundColor: "#BBF7D0", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>Feedback</span>
                                : data.status === "reject" ?
                                    <span style={{ backgroundColor: "#FECACA", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>Reject</span>
                                : <></>
                             }
                        </div>
                        {/* <div>
                            <div className="circle" style={{ backgroundColor: data.priority === "low" ? "limegreen" : "red" }}></div><span style={{ marginLeft: "-8px" }}>{data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}</span>
                        </div> */}
                    </div>
                    <p style={{ margin: 0 }}>{data.problem}</p>
                </div>
                <div className={Styles['card-footer']}>
                    {data.closed_at && data.status === "completed" ?
                            <button type="button" className={Styles['btn-open-ticket']} onClick={() => onClickOpenTicket(data.ticket_no)}><MessageCircleMore size={18} /> Buka Ticket</button>
                        : !data.closed_at && data.status === "completed" ?
                            <>
                                <button type="button" className={Styles['btn-closed']} onClick={() => onClickClosed(data.ticket_no)}><X size={18} /> Tutup Tiket</button>
                                <button type="button" className={Styles['btn-respon']} onClick={() => onClickResponse(data.ticket_no)}><MessageCircleMore size={18} /> Respon</button>
                            </>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}