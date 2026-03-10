import { Plus, Trash, Pencil, RefreshCcw } from "lucide-react";
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

export function RefreshButton() {
    return (
        <button type="button" className="btn-refresh"><RefreshCcw /></button>
    );
}

export function SubmitButton({ onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className="btn-submit">Submit</button>
    );
}

export function CancelButton({ onClose, label }: Props) {
    return (
        <button type="button" onClick={onClose} className="btn-cancel">{label}</button>
    );
}