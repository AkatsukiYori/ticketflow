import Styles from "./confirmModal.module.css";
import { CancelButton, SubmitButton } from "../../buttons/Button";
import { TriangleAlertIcon, CircleQuestionMark } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ErrorNotification, SuccessNotification } from "../../notifications/notification";
import { useApi } from "../../../hooks/useApi";

type Props = {
    open: boolean;
    isTicket?: boolean;
    data?: any;
    onConfirm?: () => void;
    onClose: () => void;
    message?: string;
}

export default function ConfirmModal({ open, onConfirm, onClose, isTicket, data, message } : Props) {
    const [userID, setUserID] = useState("");
    const { callApi } = useApi();

    const fetchUser = useCallback(async (name: string) => {
        if(!name) return;
        try {
            const result = await callApi("get", `/users/get-user/${name}`);
            setUserID(result.id);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if(storedUsername) {
            fetchUser(storedUsername);
        }
    }, [fetchUser]);

    async function handleUpdate() {
        const payload = {
            user_id: userID
        };
        try {
            const res = await callApi("put", `/tickets/assign/${data.ticket_no}`, payload);
            SuccessNotification({ message: res.message, variantType: "success" });
            onClose();
        } catch (error: any) {
            ErrorNotification({ message: "Something Went Wrong.", variantType: "error" });
        }
    }

    const handleSubmit = () => {
        if(isTicket) {
            handleUpdate();
        } else if(onConfirm) {
            onConfirm();
        }
    }

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>{isTicket ? <CircleQuestionMark /> : <TriangleAlertIcon />} Are You Sure?</h3>
                    <p style={{ marginTop: "10px", marginBottom: 0, textAlign: "center" }}>{isTicket === false ? message : `Ticket no ${data.ticket_no} will assign to you.` }</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <SubmitButton onClick={handleSubmit} label="Yes" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </section>
        </section>
    );
}