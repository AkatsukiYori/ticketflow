import "../../../components/modals/confirmModal/confirmModal.css";

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ open, onConfirm, onCancel } : Props) {
    if(!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-popup">
                <h3>Apakah anda yakin ?</h3>

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button type="button" onClick={onConfirm}>Yes</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}