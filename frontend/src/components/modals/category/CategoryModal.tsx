import { useEffect, useState } from "react";
import "../../../components/modals/category/categoryModal.css";
import { InputText } from "../../inputs/Input";
import { SubmitButton, CancelButton, HeaderModalButton } from "../../buttons/Button";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    data?: { id: number, name: string };
    onClose: () => void;
    onSubmit: (data: any) => void;
    onUpdate: (data: any) => void;
}

export default function CategoryModal({ open, mode, data, onClose, onSubmit, onUpdate } : Props) {
    const [name, setName] = useState("");
    useEffect(() => {
        if(mode === "edit" && data) {
            setName(data.name);
        } else {
            setName("");
        }
    }, [data, mode, open]);

    function handleSave() {
        if(mode === "create") {
            onSubmit({
                name: name
            });
            setName("");
        } else {
            onUpdate({
                id: data?.id,
                name: name
            })
        }

        setName("");
    }

    return (
        <div className={`modal-overlay ${open ? "show" : "hide"}`}>
            <div className={`modal-popup ${open ? "show" : "hide"}`}>
                <div className="modal-header">
                    <h2>{ mode === "create" ? "New Category" : "Edit Category" }</h2>
                    <HeaderModalButton onClose={onClose} label="X" />
                </div>
                <div className="modal-body">
                    <InputText name="category_name" id="category_name" placeholder="Category Name" value={name} onChangeInput={(e) => setName(e.target.value)} style={{ width: "100%" }} />
                </div>
                <div className="modal-footer">
                    <SubmitButton onClick={handleSave} label="Submit" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}