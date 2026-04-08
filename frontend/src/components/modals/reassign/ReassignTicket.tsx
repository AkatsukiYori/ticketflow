import Styles from "./reassignTicket.module.css";
import { HeaderModalButton, TextAssignButton, CancelButton } from "../../buttons/Button";
import { useApi } from "../../../hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import { ErrorNotification, SuccessNotification } from "../../notifications/notification";
import { socket } from "../../../api/socket";
import { SelectOptions } from "../../inputs/Input";

type Props = {
    open: boolean;
    onClose: () => void;
    data?: any;
    isReassign: boolean;
    userId: string;
}

export default function ReassignModal({ open, onClose, data, isReassign, userId }: Props) {
    const [userData, setUserData] = useState<any[]>([]);
    const [pic, setPic] = useState("");
    const [priority, setPriority] = useState("");
    const [error, setError] = useState<{ pic?: string, priority?: any }>({});

    const { callApi } = useApi();
    
    const validate = () => {
        const newError: {pic?: string, priority?: any} = {};
        if(!pic.trim() && isReassign) {
            newError.pic = "PIC cannot be empty.";
        }

        if(!priority.trim()) {
            newError.priority = "Priority cannot be empty.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setError({});
        setPic("");
        setPriority("");
    }

    const fetchUser = useCallback(async () => {
        try {
            const res = await callApi("get", "/users/get-all-user");
            setUserData(res);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, []);

    useEffect(() => {
        handleClear();
    }, [open]);

    useEffect(() => {
        fetchUser();
        socket.on("user-change", () => {
            fetchUser();
        });

        return () => {
            socket.off("user-change");
        }
    }, [fetchUser]);

    async function handleSubmit() {
        if(!validate()) return;

        const payload = {
            user_id: pic ? pic : userId,
            priority: priority
        };

        try {
            const res = await callApi("put", `/tickets/assign/${data.ticket_no}`, payload);
            SuccessNotification({ message: res.message, variantType: "success" });
            handleClear();
            onClose();
        } catch (error: any) {
            ErrorNotification({ message: "Something went wrong.", variantType: "error" });
        }
    }

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>{isReassign ? "Re-assign Ticket" : "Assign Ticket"}</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{data.ticket_no}</p>
                    </div>
                    <HeaderModalButton onClose={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: isReassign ? "block" : "none" }}>
                            <label htmlFor="">New PIC <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                label="-- Choose PIC --"
                                name="pic"
                                id="pic"
                                value={pic}
                                onChangeSelect={(e) => {
                                    setPic(e.target.value);
                                    if(error.pic) setError(prev => ({ ...prev, pic: "" }));
                                }}
                                options={userData.map((e: any) => ({
                                    value: e.id,
                                    label: e.username
                                }))}
                                style={{ width: "100%", borderColor: error.pic ? "red" : "" }}
                            />
                            {error.pic && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.pic}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="">Priority <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                label="-- Set Priority --"
                                name="priority"
                                id="priority"
                                value={priority}
                                onChangeSelect={(e) => {
                                    setPriority(e.target.value);
                                    if(error.priority) setError(prev => ({ ...prev, priority: "" }));
                                }}
                                options={[
                                    { value: "high", label: "High" },
                                    { value: "mid", label: "Mid" },
                                    { value: "low", label: "Low" }
                                ]}
                                style={{ width: "100%", borderColor: error.priority ? "red" : "" }}
                            />
                            {error.priority && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.priority}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <TextAssignButton onClick={handleSubmit} label="Assign" />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}