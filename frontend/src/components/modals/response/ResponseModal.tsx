import { useState } from "react";
import { InputText } from "../../inputs/Input";
import { SubmitButton, CancelButton, HeaderModalButton } from "../../buttons/Button";
import Styles from "./responseModal.module.css";

type Props = {
    open: boolean;
    onClose: () => void;
    onClick: (respon: string) => void;
};

export default function ResponseModal({ open, onClose, onClick }: Props) {
    const [respon, setRespon] = useState("");
    const [error, setError] = useState<{ respon?: string }>({});

    const validate = () => {
        const newError: { respon?: string } = {};
        if(!respon.trim()) {
            newError.respon = "Feedback tidak boleh kosong."
        };

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = () => {
        if(validate()) {
            onClick(respon);
            setRespon("");
        }
    }

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>Respon</h2>
                    <HeaderModalButton onClose={onClose} label="X" />
                </div>
                <div className={Styles['modal-body']}>
                    <label htmlFor="">Feedback <span style={{ color: "red" }}>*</span></label>
                    <InputText
                        name="respon"
                        id="respon"
                        placeholder="Berikan respon"
                        value={respon}
                        onChangeInput={(e) => {
                            setRespon(e.target.value);
                            if(error.respon) setError(prev => ({ ...prev, respon: "" }));
                        }}
                        style={{ width: "100%", borderColor: error.respon ? "red" : "" }}
                    />
                    {error.respon && (
                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.respon}</span>
                    )}
                </div>
                <div className={Styles['modal-footer']}>
                    <SubmitButton onClick={handleSubmit} label="Submit" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </section>
        </section>
    );
}