import Styles from "./reopenModal.module.css";
import { CancelButton, SubmitButton } from "../../buttons/Button";
import { TriangleAlertIcon } from "lucide-react";

type Props = {
    open: boolean;
    onClick: () => void;
    onClose: () => void;
    data: any;
}

export default function ReopenModal({ open, onClick, onClose, data } : Props) {
    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><TriangleAlertIcon />Are you sure ?</h3>
                    <p style={{ marginTop: "10px", marginBottom: 0, textAlign: "center" }}>Are you sure want to re-open ticket #{data?.ticket_no}</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <SubmitButton onClick={onClick} label="Open" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </section>
        </section>
    );
}