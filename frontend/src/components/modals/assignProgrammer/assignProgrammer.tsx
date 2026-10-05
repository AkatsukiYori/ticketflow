import Styles from "./assignProgrammer.module.css";
import { Buttons } from "../../buttons/Button";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { Notifications } from "../../notifications/notification";
import { InputText } from "../../inputs/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    open: boolean;
    onClose: () => void;
    data?: any;
    userId: string;
}

export default function AssignProgrammerModal({ open, onClose, data, userId }: Props) {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const [programmer, setProgrammer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ programmer?: string }>({});
    
    const validate = () => {
        const newError: {programmer?: string} = {};

        if(!programmer) {
            newError.programmer = "Programmer name cannot be empty.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setError({});
        setProgrammer("");
    }

    useEffect(() => {
        if(open) {
            handleClear();
        }
    }, [open]);

    const handleSubmitMutation = useMutation({
        mutationFn: async (payload: any) => {
            return await callApi("put", `/tickets/assign-programmer/${data?.ticket_no}`, payload);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            handleClear();
            onClose();

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });

            queryClient.invalidateQueries({
                queryKey: ['ticket-detail', data?.id]
            });
            setLoading(false);
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleSubmit() {
        if(!validate()) return;
        setLoading(true);
        const payload = {
            user_id: userId,
            programmer: programmer,
        };
        handleSubmitMutation.mutate(payload);
    }

    if(!open) return null;

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>Assign Programmer</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{data?.ticket_no}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                            <label htmlFor="">Programmer <span style={{ color: "red" }}>*</span></label>
                            <InputText
                                type="text"
                                name="programmer"
                                id="programmer"
                                placeholder="Assign Programmer"
                                value={programmer}
                                onChangeInput={(e) => {
                                    setProgrammer(e.target.value);
                                    if(error.programmer) setError(prev => ({ ...prev, programmer: "" }));
                                }}
                                style={{ width: "100%", marginTop: "4px", borderColor: error.programmer ? "red" : "" }}
                            />
                            {error.programmer && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.programmer}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label={loading ? "Assigning..." : "Assign"} func="assign-label" btnTitle="Assign" onClick={handleSubmit} />
                    <Buttons label="Cancel" func="cancel" btnTitle="Cancel" onClick={onClose} />
                </div>
            </div>
        </div>
    );
}