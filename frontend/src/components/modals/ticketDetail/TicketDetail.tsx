import { useCallback, useEffect, useState } from "react";
import { Buttons } from "../../buttons/Button";
import Styles from "./ticketDetail.module.css";
import { useApi } from "../../../hooks/useApi";
import { Notifications } from "../../notifications/notification";
import ReassignModal from "../reassign/ReassignTicket";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Star } from "lucide-react";

type Props = {
    open: boolean;
    data: any;
    onClose: () => void;
    userRole?: string;
}

export default function TicketDetailModal({ open, data, onClose, userRole }: Props) {
    const { callApi } = useApi();
    
    const [userID, setUserID] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isAlreadyAssign, setIsAlreadyAssign] = useState(
        data?.assign_to !== null && data?.assign_to !== undefined
    );

    const fetchUser = useCallback(async (name: string) => {
        if(!name) return;

        try {
            const result = await callApi("get", `/users/get-user/${name}`);
            setUserID(result.id);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    async function handleUpdate() {
        const payload = {
            user_id: userID
        };

        try {
            const res = await callApi("put", `/tickets/assign/${data.ticket_no}`, payload);
            Notifications({ message: res.message, variantType: "success", persist: false });  
            setIsAlreadyAssign(true);
            onClose();
        } catch (error: any) {
            Notifications({ message: "Somthing went wrong.", variantType: "error", persist: false });
        }
    }

    const handleSubmit = () => {
        if(isAlreadyAssign) {
            setOpenModal(true);
        } else {
            handleUpdate();
        }
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if(storedUsername) {
            fetchUser(storedUsername);
        }
    }, [fetchUser]);

    console.log(data);

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>Ticket Detail</h2>
                        <p style={{ margin: 0 }}>#{data.ticket_no}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div className={Styles['modal-body-content']}>
                        <h4>Information</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Ticket No</td>
                                    <td>{data.ticket_no}</td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>{new Date(data.report_date).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Asia/Jakarta"
                                    }).replaceAll(/\./g, ":")}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{data.status?.split("_").map((word: String) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</td>
                                </tr>
                                <tr>
                                    <td>Priority</td>
                                    <td>{data.priority?.toUpperCase() || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Estimate</td>
                                    <td>{new Date(data.estimate).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Asia/Jakarta"
                                    }).replaceAll(/\./g, ":") || "-"}</td>
                                </tr>
                                {data.closed_at && (
                                    <tr>
                                        <td>Closed At</td>
                                        <td>{new Date(data.closed_at).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            timeZone: "Asia/Jakarta"
                                        }).replaceAll(/\./g, ":")}</td>
                                    </tr>
                                )}
                                {data.status === "reject" && (
                                    <tr>
                                        <td>Reject Reason</td>
                                        <td>{data.status_reason}</td>
                                    </tr>
                                )}
                                {data.repoened_at && (
                                    <tr>
                                        <td>Reopened At</td>
                                        <td>{new Date(data.reopened_at).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            timeZone: "Asia/Jakarta"
                                        }).replaceAll(/\./g, ":")}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Reported By</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>User</td>
                                    <td>{data.fk_member?.username}</td>
                                </tr>
                                <tr>
                                    <td>Whatsapp No</td>
                                    <td>{data.no_wa}</td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>{data.fk_department?.name}</td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{data.location}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Additional</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Category</td>
                                    <td>{data.fk_category_id?.name}</td>
                                </tr>
                                {(data.fk_category_id?.name == "IKB" || data.fk_category_id?.name == "ikb")  && (
                                    <>
                                        <tr>
                                            <td>Modul</td>
                                            <td>{data.modul}</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Modul</td>
                                            <td>{data.sub_modul}</td>
                                        </tr>
                                    </>
                                )}
                                <tr>
                                    <td>Ticket Title</td>
                                    <td>{data.ticket_title}</td>
                                </tr>
                                <tr>
                                    <td>Problem</td>
                                    <td>{data.problem}</td>
                                </tr>
                                <tr>
                                    <td>Note</td>
                                    <td>{data.note || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Attachment</h4>
                        {data?.images?.filename ?
                            <>
                                <Zoom>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/tickets/${data?.images?.filename}`}
                                        alt="Attachment"
                                        width="100%"
                                        height={400}
                                        style={{ objectFit: "contain" }}
                                    />
                                </Zoom>
                            </>
                        : "No Attachment"}
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Rating</h4>
                        {data?.rating?.score ? (
                            <>
                                {[1,2,3,4,5].map((star) => (
                                    <span key={star}>
                                        {star <= data?.rating?.score ? <Star color="#FFD166" fill="#FFD166" /> : <Star color="#FFD166" />}
                                    </span>
                                ))}
                            </>
                        ) : "No Rating"}
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    {userRole === "admin" && (
                        <Buttons label={isAlreadyAssign ? "Re-assign" : "Apply"} btnTitle={isAlreadyAssign ? "Re-assign" : "Apply"} onClick={handleSubmit} func="assign-label" />
                    )}
                    <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={onClose} />
                </div>
            </div>

            <ReassignModal open={openModal} onClose={() => setOpenModal(false)} data={data} isReassign={true} userId={userID} />
        </div>
    );
}
