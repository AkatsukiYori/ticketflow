import { useCallback, useEffect, useState } from "react";
import { Buttons } from "../../buttons/Button";
import { InputText, TextArea, SelectOptions } from "../../inputs/Input";
import Styles from "./documentationModal.module.css";
import { Notifications } from "../../notifications/notification";
import { useApi } from "../../../hooks/useApi";
import { socket } from "../../../api/socket";
import { FileUpload } from "../../FileUpload";
import { X } from "lucide-react";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    data?: {
        id: string;
        title: string;
        description: string;
        category_id: string;
        documentation_files: {
            filename: string;
        };
    };
    onClose: () => void;
    onSubmit: (data: any) => void;
    onUpdate: (data: any) => void;
    validation?: { [key: string]: string };
}

export default function DocumentationModal({ open, mode, data, onClose, onSubmit, onUpdate, validation }: Props) {
    const { callApi } = useApi();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [attachment, setAttachment] = useState("");
    const [dataCategory, setDataCategory] = useState<any[]>([]);
    const [error, setError] = useState<{ [key: string]: string }>({});

    const clearError = (field: string) => {
        setError(prev => ({ ...prev, [field]: "" }));
    };
    const options = dataCategory.map((val: any) => ({
        value: val.id,
        label: val.name
    }));
    const selectedCategoryValue = options.find(opt => opt.value === category) || null;

    const fetchCategory = useCallback(async () => {
        try {
            const result = await callApi("get", "/categories/get-all-categories");
            setDataCategory(result);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    function handleCloseModal() {
        setTitle("");
        setDescription("");
        setCategory("");
        setAttachment("");
        setError({});
        onClose();
    }

    useEffect(() => {
        if(!open) {
            setError({});
        } else if(validation) {
            setError(validation);
        }
    }, [open, validation]);

    useEffect(() => {
        fetchCategory();

        const handleSocket = () => fetchCategory();
        socket.on("category-change", handleSocket);

        if(open) {
            if(mode === "edit" && data) {
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category_id);
                setAttachment(data?.documentation_files?.filename || "");
            } else {
                setTitle("");
                setDescription("");
                setCategory("");
                setAttachment("");
            }
        }

        return () => {
            socket.off("category-change", handleSocket);
        }
    }, [data, mode, open, fetchCategory]);

    function handleSave() {
        const payload = {
            title: title,
            description: description,
            category_id: category,
            attachment: attachment
        };

        if(mode === "create") {
            onSubmit(payload);
            setTitle("");
            setDescription("");
            setCategory("");
            setAttachment("");
        } else {
            onUpdate({
                id: data?.id,
                ...payload
            });
        }
    }

    if(!open) return null;

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>{ mode === "create" ? "New Documentation" : "Edit Documentation" }</h2>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={handleCloseModal} />
                </div>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="">Category <span style={{ color: "red" }}>*</span></label>
                    <SelectOptions
                        name="category"
                        id="category"
                        placeholder="Choose Category"
                        searchAble={true}
                        value={selectedCategoryValue}
                        onChangeSelect={(e) => {
                            setCategory(e ? e.value : "");
                            clearError("category");
                        }}
                        style={{ width: "100%", borderColor: error.category_id ? "red" : "" }}
                        options={dataCategory.map((e: any) => ({
                            label: e.name,
                            value: e.id
                        }))}
                    />
                    {error.category_id && (
                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.category_id}</span>
                    )}
                        
                    <label htmlFor="">Title <span style={{ color: "red" }}>*</span></label>
                    <InputText
                        name="title"
                        id="title"
                        placeholder="Documentation Title"
                        value={title}
                        onChangeInput={(e) => {
                            setTitle(e.target.value);
                            clearError("title");
                        }}
                        style={{ width: "100%", borderColor: error.title ? "red" : "" }} />
                    {error.title && (
                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.title}</span>
                    )}

                    <label htmlFor="">Description <span style={{ color: "red" }}>*</span></label>
                    <TextArea
                        name="description"
                        id="description"
                        placeholder="Documentation Description"
                        value={description}
                        onChangeTextArea={(e) => {
                            setDescription(e.target.value);
                            clearError("description");
                        }}
                        style={{ width: "100%", borderColor: error.description ? "red" : "" }} />
                    {error.description && (
                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.description}</span>
                    )}
                    <label htmlFor="">Attachment (Optional)</label>
                    <FileUpload
                        onUploadSuccess={(id) => setAttachment(id)}
                        onRevert={() => setAttachment("")}
                        module="documentation"
                        mode={mode}
                        document={data?.id || ""}
                        fileName={data?.documentation_files?.filename || ""}
                    />
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Submit" btnTitle="Submit" func="submit" onClick={handleSave} />
                    <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={handleCloseModal} />
                </div>
            </div>
        </div>
    );
}