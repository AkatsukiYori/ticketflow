import React, { useEffect, useState } from "react";
import { InputText, SelectOptions, TextArea } from "../../inputs/Input";
import { Buttons } from "../../buttons/Button";
import Styles from "./kpiModal.module.css";
import { Percent } from "lucide-react";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    data?: {
        id: number;
        name: string;
        description: string[];
        formula: string;
        verificator: string;
        weight: string;
        year_target: string;
        target_status: string;
    };
    onClose: () => void;
    onSubmit: (data: any) => void;
    onUpdate: (data: any) => void;
    validation?: { [key: string]: string };
}

export default function KpiModal({ open, mode, data, onClose, onSubmit, onUpdate, validation } : Props) {
    const [formData, setFormData] = useState({
        name: "",
        weight: "",
        formula: "",
        year_target: "",
        verificator: "",
        description: [""],
        target_status: "qty"
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDescriptionChange = (
        index: number,
        value: string
    ) => {
        setFormData((prev) => {
            const descriptions = [...prev.description];
            descriptions[index] = value;
            return {
                ...prev,
                description: descriptions
            };
        });
    };

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
                setFormData({
                    name: data.name,
                    description: data.description,
                    weight: data.weight,
                    formula: data.formula,
                    year_target: data.year_target,
                    verificator: data.verificator,
                    target_status: data.target_status
                });
            } else {
                setFormData({
                    name: "",
                    weight: "",
                    formula: "",
                    year_target: "",
                    verificator: "",
                    description: [""],
                    target_status: "qty"
                })
            }
        }
    }, [data, mode, open]);

    function handleSave() {
        if(mode === "create") {
            onSubmit({
                name: formData.name,
                weight: formData.weight,
                formula: formData.formula,
                verificator: formData.verificator,
                year_target: formData.year_target,
                description: formData.description,
                target_status: formData.target_status
            });

            if(!error) {
                setFormData({
                    name: "",
                    weight: "",
                    formula: "",
                    year_target: "",
                    verificator: "",
                    description: [""],
                    target_status: ""
                })
            }
        } else {
            onUpdate({
                id: data?.id,
                name: formData.name,
                weight: formData.weight,
                formula: formData.formula,
                verificator: formData.verificator,
                year_target: formData.year_target,
                description: formData.description,
                target_status: formData.target_status
            })
        }
    }

    const addDescription = () => {
        setFormData((prev) => ({
            ...prev,
            description: [...prev.description, ""]
        }));
    }

    const removeDescription = (
        index: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            description: prev.description.filter(
                (_, i) => i !== index
            )
        }));
    }

    const targetStatus = [
        {
            name: "QTY",
            value: "qty"
        },
        {
            name: "Percent",
            value: "percent"
        }
    ]

    if(!open) return null;

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>{ mode === "create" ? "New KPI Point" : "Edit KPI Point" }</h2>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "600px", overflowY: "auto", scrollbarWidth: "none" }}>
                    <div className="formField">
                        <label htmlFor="">Point Name <span style={{ color: "red" }}>*</span></label>
                        <InputText
                            name="name"
                            id="name"
                            placeholder="Insert Point Name"
                            value={formData.name}
                            onChangeInput={(e) => {
                                handleChange(e)
                                clearError("name");
                            }}
                            style={{ width: "100%", borderColor: error.name ? "red" : "" }}
                        />
                        {error.name && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.name}</span>
                        )}
                    </div>
                    <div className="formField">
                        <label htmlFor="">Description</label>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}
                        >
                            {formData.description.map((description, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px"
                                    }}
                                >
                                    <TextArea
                                        key={index}
                                        name={`descriptino-${index}`}
                                        placeholder={`Insert Description ${index + 1}`}
                                        value={description}
                                        onChangeTextArea={(e) => {
                                            handleDescriptionChange(index, e.target.value);
                                            clearError("description");
                                        }}
                                        style={{ width: "100%", borderColor: error.description ? "red" : "" }}
                                    />

                                    {formData.description.length > 1 && (
                                        <Buttons
                                            label=""
                                            func="remove-desc"
                                            btnTitle="Remove Description"
                                            onClick={() => removeDescription(index)}
                                            style={{
                                                height: "30px"
                                            }}
                                        />
                                    )}
                                </div>
                            ))}

                            <Buttons
                                label=""
                                func="add-more"
                                btnTitle="Add More Description"
                                onClick={addDescription}
                                style={{
                                    height: "30px"
                                }}
                            />
                        </div>
                        {error.description && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.description}</span>
                        )}
                    </div>
                    <div className="formField">
                        <label htmlFor="">Weight <span style={{ color: "red" }}>*</span></label>
                        <div className={Styles['input-group']}>
                            <div>
                                <InputText
                                    name="weight"
                                    id="weight"
                                    placeholder="Insert Weight"
                                    value={formData.weight}
                                    onChangeInput={(e) => {
                                        if(/^\d*$/.test(e.target.value)) {
                                            handleChange(e)
                                            clearError("weight");
                                        }
                                    }}
                                    style={{ width: "100%", borderColor: error.weight ? "red" : "" }}
                                />
                            </div>
                            <div>
                                <Percent />
                            </div>
                        </div>
                        {error.weight && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.weight}</span>
                        )}
                    </div>
                    <div className="formField">
                        <label htmlFor="">Formula <span style={{ color: "red" }}>*</span></label>
                        <TextArea
                            name="formula"
                            id="formula"
                            placeholder="Insert Formula"
                            value={formData.formula}
                            onChangeTextArea={(e) => {
                                handleChange(e)
                                clearError("weight");
                            }}
                            style={{ width: "100%", borderColor: error.formula ? "red" : "" }}
                        />
                        {error.formula && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.formula}</span>
                        )}
                    </div>
                    <div className="formField">
                        <label htmlFor="">Yearly target <span style={{ color: "red" }}>*</span></label>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 100px",
                                gap: "4px"
                            }}
                        >
                            <div>
                                <InputText
                                    name="year_target"
                                    id="year_target"
                                    placeholder="Insert Yearly Target"
                                    value={formData.year_target}
                                    onChangeInput={(e) => {
                                        if(/^\d*$/.test(e.target.value)) {
                                            handleChange(e)
                                            clearError("year_target");
                                        }
                                    }}
                                    style={{ width: "100%", borderColor: error.year_target ? "red" : "" }}
                                />
                                {error.year_target && (
                                    <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.year_target}</span>
                                )}
                            </div>
                            <div>
                                <SelectOptions
                                    name="target_status"
                                    id="target_status"
                                    placeholder="Choose Status"
                                    searchAble={true}
                                    value={formData.target_status}
                                    onChangeSelect={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            target_status: e?.value ?? ""
                                        }));
                                        clearError("target_status");
                                    }}
                                    style={{ width: "100%", borderColor: error.category_id ? "red" : "" }}
                                    options={targetStatus.map((e: any) => ({
                                        label: e.name,
                                        value: e.value
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="formField">
                        <label htmlFor="">Verificator <span style={{ color: "red" }}>*</span></label>
                        <InputText
                            name="verificator"
                            id="verificator"
                            placeholder="Insert Verificator"
                            value={formData.verificator}
                            onChangeInput={(e) => {
                                handleChange(e)
                                clearError("verificator");
                            }}
                            style={{ width: "100%", borderColor: error.verificator ? "red" : "" }}
                        />
                        {error.verificator && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.verificator}</span>
                        )}
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Submit" btnTitle="Submit" func="submit" onClick={handleSave} />
                    <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}