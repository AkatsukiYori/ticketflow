import { Buttons } from "../../buttons/Button";
import Styles from "../../../css/layouts/admin/modal.module.css";
import { useApi } from "../../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";

type Props = {
    open: boolean;
    ticketId?: number;
    onClose: () => void;
}

export default function LogsModal({ open, ticketId, onClose }: Props) {
    const { callApi } = useApi();

    const fetchLogs = async () => {
        if(!ticketId) return [];
        const res = await callApi("get", `/logs/get-logs-by-ticket/${ticketId}`);

        console.log(res);
        return Array.isArray(res) ? res : [];
    }

    const fetchTicket = async () => {
        if(!ticketId) return [];
        return await callApi("get", `/tickets/get-ticket/${ticketId}`);
    }

    const { data: logsData = [] } = useQuery({
        queryKey: ['logs', ticketId],
        queryFn: fetchLogs,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60,
        enabled: !!ticketId
    });

    const { data: ticketData = [] } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: fetchTicket,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60,
        enabled: !!ticketId
    });

    if(!open) return null;

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>Logs</h2>
                        <p style={{ margin: 0 }}>#{ticketData?.ticket_no}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div className={Styles['modal-body-content']}>
                        {logsData.length > 0 ? (
                            <>
                                {logsData.map((value: any) => (
                                    <div className={Styles['time-line']}>
                                        <span className={Styles['circle-logs']}></span>
                                        <div className={Styles['time-line-content']}>
                                            <p>
                                                <span>{value.action_type.charAt(0).toUpperCase() + value.action_type.slice(1).replaceAll("_", " ")}</span> By {value.user_id ? value.fk_user_id?.username : ticketData?.fk_member?.username} {new Date(value.fk_ticket_id?.report_date).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    timeZone: "Asia/Jakarta"
                                                }).replaceAll(/\./g, ":")}
                                            </p>
                                            {(value.action_type === "feedback" || value.action_type === "reject") && (
                                                <p>{value.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ): (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Cancel" func="cancel" btnTitle="Cancel" onClick={onClose} />
                </div>
            </div>
        </div>
    );
}