import Styles from "./confirmModal.module.css";
import { Buttons } from "../../buttons/Button";
import { TriangleAlertIcon, CircleQuestionMark } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Notifications } from "../../notifications/notification";
import { useApi } from "../../../hooks/useApi";

type Props = {
    open: boolean;
    isTicket?: boolean;
    isAssign?: boolean;
    data?: any;
    onConfirm?: () => void;
    onClose: () => void;
    message?: string;
    label: string;
    btnCancel: string;
    btnYes: string;
}

export default function ConfirmModal({ open, onConfirm, onClose, isTicket, data, message, isAssign, label, btnYes, btnCancel } : Props) {
    const [userID, setUserID] = useState("");
    const { callApi } = useApi();

    const fetchUser = useCallback(async (name: string) => {
        if(!name) return;
        try {
            const result = await callApi("get", `/users/get-user/${name}`);
            setUserID(result.id);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
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
            Notifications({ message: res.message, variantType: "success", persist: false });
            onClose();
        } catch (error: any) {
            Notifications({ message: "Something Went Wrong.", variantType: "error", persist: false });
        }
    }

    async function handleRemove() {
        try {
            const res = await callApi("put", `/tickets/delete-ticket/${data.id}`);
            Notifications({ message: res.message, variantType: "success", persist: false });
            onClose();
        } catch (error: any) {
            Notifications({ message: "Something Went Wrong.", variantType: "error", persist: false });
        }
    }

    const handleSubmit = () => {
        if(isTicket) {
            if(isAssign) {
                handleUpdate();
            } else {
                handleRemove();
            }
        } else if(onConfirm) {
            onConfirm();
        }
    }

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>{isTicket ? <CircleQuestionMark /> : <TriangleAlertIcon />} {label}</h3>
                    <p style={{ marginTop: "10px", marginBottom: 0, textAlign: "center" }}>{isTicket === false ? message : isAssign ? `Ticket no ${data.ticket_no} will assign to you.` : `Ticket no ${data.ticket_no} will be removed.` }</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <Buttons label="Yes" btnTitle={btnYes} func="submit" onClick={handleSubmit} />
                    <Buttons label="Cancel" btnTitle={btnCancel} func="cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}