import Styles from "./feedback.module.css";
import { HeaderModalButton } from "../../buttons/Button";
import { CancelButton, SubmitButton } from "../../buttons/Button";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "../../inputs/Input";
import { useApi } from "../../../hooks/useApi";
import { ErrorNotification, SuccessNotification } from "../../notifications/notification";
import { socket } from "../../../api/socket";

type Props = {
    open: boolean;
    mode: string;
    onClose: () => void;
    ticket?: any;
}

export const FeedbackModal = ({ open, onClose, mode, ticket }: Props) => {
    const [label, setLabel] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");

    const { callApi } = useApi();

    const fetchUser = useCallback(async (name: string) => {
        if(!name) return;

        try {
            const result = await callApi("get", `/users/get-user/${name}`);
            setUserId(result.id);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    async function handleSubmit() {
        const payloadReject = {
            reason: reason
        };

        const payloadFeedback = {
            reason: reason,
            role: "admin",
            user_id: userId
        }

        try {
            if(mode === "reject") {
                const res = await callApi("put", `/tickets/reject-ticket/${ticket.ticket_no}`, payloadReject);
                SuccessNotification({ message: res.message, variantType: "success" });
            } else {
                const res = await callApi("put", `/tickets/feedback/${ticket.ticket_no}`, payloadFeedback);
                SuccessNotification({ message: res.message, variantType: "success" });
            }
            setReason("");
            onClose();
        } catch (error: any) {
            ErrorNotification({ message: "Something went wring.", variantType: "error" });
        }
    }

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if(storedName) {
            fetchUser(storedName);
        }

    }, [fetchUser]);

    useEffect(() => {
        if(mode === "feedback") {
            setLabel("Feedback");
        } else {
            setLabel("Reject Reason");
        }

        if(reason === "") {
            if(mode === "feedback") {
                setError("Feedback cannot be empty.");
            } else {
                setError("Reject reason cannot be empty.");
            }
        }
    }, [open, reason]);

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div style={{ textAlign: "left" }}>
                        <h2 style={{ margin: 0 }}>{mode === "feedback" ? "Feedback" : "Reject Ticket" }</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{ticket.ticket_no}</p>
                    </div>
                    <HeaderModalButton onClose={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%", textAlign: "left" }}>
                        <label htmlFor="">{label} <span style={{ color: "red" }}>*</span></label>
                        <InputText
                            name="reason"
                            id="reason"
                            placeholder={label}
                            value={reason}
                            onChangeInput={(e) => {
                                setReason(e.target.value);
                                setError("");
                            }}
                            style={{ width: "100%", marginTop: "4px", borderColor: error === "" ? "" : "red" }}
                        />
                        {error && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error}</span>
                        )}
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <SubmitButton onClick={handleSubmit} label={mode === "reject" ? "Reject" : "Feedback"} />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}