import Styles from "./feedback.module.css";
import { HeaderModalButton } from "../../buttons/Button";
import { CancelButton, SubmitButton } from "../../buttons/Button";
import { useCallback, useEffect, useState } from "react";
import { InputText, CustomCheckbox } from "../../inputs/Input";
import { useApi } from "../../../hooks/useApi";
import { ErrorNotification, SuccessNotification } from "../../notifications/notification";

type Props = {
    open: boolean;
    mode: string;
    onClose: () => void;
    ticket?: any;
    userRole: string;
}

export const FeedbackModal = ({ open, onClose, mode, ticket, userRole }: Props) => {
    const [reason, setReason] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState<{ reason?: string; estimate?: string; }>({});
    const [isDoc, setIsDoc] = useState<boolean>(false);

    const { callApi } = useApi();

    const validate = () => {
        const newError: { reason?: string; estimate?: string } = {};
        if(!reason.trim()) {
            newError.reason = mode === "feedback" ? "Feedback cannot be empty." : "Reject reason cannot be empty."
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setReason("");
        setError({});
        setIsDoc(false);
    }

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
        if(!validate()) return;

        const payloadReject = {
            reason: reason
        };

        const payloadFeedback = {
            reason: reason,
            role: "admin",
            user_id: userId,
            make_doc: isDoc
        }

        try {
            if(mode === "reject") {
                const res = await callApi("put", `/tickets/reject-ticket/${ticket.ticket_no}`, payloadReject);
                SuccessNotification({ message: res.message, variantType: "success" });
            } else {
                const res = await callApi("put", `/tickets/feedback/${ticket.ticket_no}`, payloadFeedback);
                SuccessNotification({ message: res.message, variantType: "success" });
            }
            handleClear();
            onClose();
        } catch (error: any) {
            ErrorNotification({ message: "Something went wrong.", variantType: "error" });
        }
    }

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if(storedName) {
            fetchUser(storedName);
        }

    }, [fetchUser]);

    useEffect(() => {
        if(open) {
            handleClear();
        }
    }, [open]);

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
                    <div style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label htmlFor="">{mode === "feedback" ? "Feedback" : "Reason"} <span style={{ color: "red" }}>*</span></label>
                            <InputText
                                name="reason"
                                id="reason"
                                placeholder={mode === "feedback" ? "Feedback" : "Reason"}
                                value={reason}
                                onChangeInput={(e) => {
                                    setReason(e.target.value);
                                    if(error.reason) setError(prev => ({ ...prev, reason: "" }));
                                }}
                                style={{ width: "100%", marginTop: "4px", borderColor: error.reason ? "red" : "" }}
                            />
                            {error.reason && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.reason}</span>
                            )}
                        </div>

                        {userRole === "admin" && (
                            <div style={{ display: mode === "feedback" ? "block" : "none" }}>
                                <CustomCheckbox
                                    label="Add to documentation ?"
                                    checked={isDoc}
                                    onChangeCheckbox={(e) => setIsDoc(e)}
                                />
                            </div>
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