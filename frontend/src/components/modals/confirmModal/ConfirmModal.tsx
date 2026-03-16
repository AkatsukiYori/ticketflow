import "./confirmModal.css";
import { CancelButton, SubmitButton } from "../../buttons/Button";
import { TriangleAlertIcon, CircleQuestionMark } from "lucide-react";

type Props = {
    open: boolean;
    isDeleted?: boolean;
    data?: any;
    onConfirm?: () => void;
    onClose: () => void;
}

export default function ConfirmModal({ open, onConfirm, onClose, isDeleted, data } : Props) {
    return (
        <div className={`modal-overlay ${open ? "show" : "hide"}`}>
            <div className={`modal-popup ${open ? "show" : "hide"}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="modal-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>{isDeleted ? <TriangleAlertIcon /> : <CircleQuestionMark />} Are You Sure?</h3>
                    <p style={{ marginTop: "10px", marginBottom: 0 }}>{isDeleted  ? "Deleted data is permanent and cannot be retrieved!" : `Ticket no ${data.ticket_no} will assign to you.` }</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <SubmitButton onClick={onConfirm} label="Yes" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}