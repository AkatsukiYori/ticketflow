import { Plus, Trash, Pencil, RefreshCcw, Info, UserCheck } from "lucide-react";
import "../../components/buttons/button.css";

type Props = {
    label?: string;
    func?: string;
    onClick?: () => void;
    onClose?: () => void;
}

export function NewButton({label, func, onClick} : Props) {
    return (
        <button type="button" className={`btn_${func}`} name={`btn_${func}`} id={`btn_${func}`} onClick={onClick} title="New"><Plus /> New {label}</button>
    );
}

export function UpdateButton({func, onClick} : Props) {
    return (
        <button type="button" className={`btn_${func}`} name={`btn_${func}`} id={`btn_${func}`} onClick={onClick} title="Edit"><Pencil /></button>
    );
}

export function DeleteButton({func, onClick} : Props) {
    return (
        <button type="button" className={`btn_${func}`} name={`btn_${func}`} id={`btn_${func}`} onClick={onClick} title="Delete"><Trash /></button>
    );
}

export function RefreshButton({ onClick }: Props) {
    return (
        <button type="button" className="btn-refresh" title="Refresh" onClick={onClick}><RefreshCcw /></button>
    );
}

export function SubmitButton({ onClick, label }: Props) {
    return (
        <button type="button" onClick={onClick} className="btn-submit">{label}</button>
    );
}

export function CancelButton({ onClose, label }: Props) {
    return (
        <button type="button" onClick={onClose} title="Cancel" className="btn-cancel">{label}</button>
    );
}

export function NewTicketButton({ onClick }: Props) {
    return (
        <button type="button" className="btn-new-ticket" onClick={onClick}>Buat Tiket Baru</button>
    );
}

export function DetailButton({ onClick }: Props) {
    return (
        <button type="button" className="btn-detail" title="Detail" onClick={onClick}><Info /></button>
    );
}

export function TextAssignButton({ onClick }: Props) {
    return (
        <button type="button" className="btn-assign-label" title="Apply" onClick={onClick}>Apply</button>
    );
}

export function IconAssignButton({ onClick }: Props) {
    return (
        <button type="button" className="btn-assign-icon" title="Apply" onClick={onClick}><UserCheck /></button>
    );
}

export function HeaderModalButton({ onClose }: Props) {
    return (
        <button type="button" className="btn-header-close" onClick={onClose}>x</button>
    );
}