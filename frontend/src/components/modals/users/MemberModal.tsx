import { useEffect, useState } from "react";
import { Buttons } from "../../buttons/Button";
import { InputText } from "../../inputs/Input";
import Styles from "./memberModal.module.css";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    data?: { id: number, username: string };
    validation?: { [key: string]: string };
    onClose: () => void;
    onSubmit: (data: any) => void;
    onUpdate: (data: any) => void;
}

export default function MemberModal({ open, data, onClose, mode, validation, onSubmit, onUpdate } : Props) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState<{[key: string]: string}>({});
    const clearError = (field: string) => {
        setError(prev => ({ ...prev, [field]: "" }));
    };

    function handleSave() {
        if(mode === "create") {
            onSubmit({
                username: username
            });
            setUsername("");
        } else {
            onUpdate({
                id: data?.id,
                username: username
            })
        }
    }

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
                setUsername(data.username);
            } else {
                setUsername("");
            }
        }
    }, [data, mode, open]);

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>{ mode === "create" ? "New User" : "Edit User" }</h2>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <label htmlFor="">Username <span style={{ color: "red" }}></span></label>
                    <InputText
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChangeInput={(e) => {
                            setUsername(e.target.value);
                            clearError("username")
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