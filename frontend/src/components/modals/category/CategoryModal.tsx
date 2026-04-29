import { useEffect, useState } from "react";
import { InputText } from "../../inputs/Input";
import { Buttons } from "../../buttons/Button";
import Styles from "./categoryModal.module.css";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    data?: { id: number, name: string };
    onClose: () => void;
    onSubmit: (data: any) => void;
    onUpdate: (data: any) => void;
    validation?: { [key: string]: string };
}

export default function CategoryModal({ open, mode, data, onClose, onSubmit, onUpdate, validation } : Props) {
    const [name, setName] = useState("");
    const [error, setError] = useState<{[key: string]: string}>({});
    const clearError = (field: string) => {
        setError(prev => ({ ...prev, [field]: "" }));
    };

    useEffect(() => {
        if(!open) {
            setError({});
        } else if(validation) {
            setError(validation);
        }
    }, [open, validation]);

    useEffect(() => {
        if(open) {
            if(mode === "edit" && data) {
                setName(data.name);
            } else {
                setName("");
            }
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
    }

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>{ mode === "create" ? "New Category" : "Edit Category" }</h2>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <label htmlFor="">Category Name <span style={{ color: "red" }}>*</span></label>
                    <InputText
                        name="category_name"
                        id="category_name"
                        placeholder="Category Name"
                        value={name}
                        onChangeInput={(e) => {
                            setName(e.target.value);
                            clearError("name");
                        }}
                        style={{ width: "100%", borderColor: error.name ? "red" : "" }}
                    />
                    {error.name && (
                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.name}</span>
                    )}
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Submit" btnTitle="Submit" func="submit" onClick={handleSave} />
                    <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}