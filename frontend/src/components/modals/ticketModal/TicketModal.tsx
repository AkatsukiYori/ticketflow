import { useState } from "react";
import Styles from "../../../css/layouts/admin/modal.module.css";
import { Buttons } from "../../buttons/Button";
import { SelectOptions } from "../../inputs/Input";

type Props = {
    open: boolean;
    isScrollAble?: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function TicketModal({ open, isScrollAble = false, onClose, onSubmit } : Props) {
    const [selectedValue, setSelectedValue] = useState("");
    const [error, setError] = useState<{selectedValue?: string}>({});
    
    const validate = () => {
        const newError: {selectedValue?: string} = {};
        if(!selectedValue) {
            newError.selectedValue = "Status point cannot be empty.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setError({});
        setSelectedValue("");
    }

    function handleSubmit() {
        const isValid = validate();

        if(!isValid) return;

        onSubmit({ status_point: selectedValue });
        handleClear();
    }

    return (
        <>
            <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
                <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                    <section className={Styles['modal-header']}>
                        <section>
                            <h2 style={{ margin: 0 }}>Edit Ticket</h2>
                            <p style={{ margin: 0 }}>#</p>
                        </section>
                        <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                    </section>
                    <section className={`${Styles['modal-body']} ${isScrollAble ? Styles['scrollable'] : ""}`}>
                        <section>
                            <label htmlFor="">Status Point <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                name="status_point"
                                id="status_point"
                                placeholder="Choose Status Point"
                                searchAble={false}
                                value={
                                    selectedValue ? {
                                        value: selectedValue,
                                        label: selectedValue
                                    } : null
                                }
                                onChangeSelect={(e) => {
                                    setSelectedValue(e ? e.value : "");
                                    if(error.selectedValue) setError(prev => ({ ...prev, selectedValue: "" }));
                                }}
                                options={[
                                    { label: "Additional", value: "additional" },
                                    { label: "Bugs", value: "bugs" }
                                ]}
                                style={{ width: "100%", borderColor: error.selectedValue ? "red" : "" }}
                            />
                            {error.selectedValue && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.selectedValue}</span>
                            )}
                        </section>
                    </section>
                    <section className={Styles['modal-footer']}>
                        <Buttons label="Submit" btnTitle="Submit" func="submit" onClick={handleSubmit} />
                        <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={onClose} />
                    </section>
                </section>
            </section>
        </>
    );
}