import Styles from "./reassignTicket.module.css";
import { HeaderModalButton, TextAssignButton, CancelButton } from "../../buttons/Button";
import { useApi } from "../../../hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import { ErrorNotification, InfoNotification, SuccessNotification } from "../../notifications/notification";
import { socket } from "../../../api/socket";
import { SelectOptions } from "../../inputs/Input";

type Props = {
    open: boolean;
    onClose: () => void;
    data?: any;
}

export default function ReassignModal({ open, onClose, data }: Props) {
    const [userData, setUserData] = useState<any[]>([]);
    const [pic, setPic] = useState("");
    const [error, setError] = useState<{ [key: string]: string }>({});
    const clearError = (field: string) => {
        setError(prev => ({ ...prev, [field]: "" }));
    };

    const { callApi } = useApi();

    const fetchUser = useCallback(async () => {
        try {
            const res = await callApi("get", "/users/get-all-user");
            setUserData(res);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, []);

    useEffect(() => {
        setPic("");
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
        const payload = { user_id: pic };
        try {
            const res = await callApi("put", `/tickets/assign/${data.ticket_no}`, payload);
            SuccessNotification({ message: res.message, variantType: "success" });
            setPic("");
            onClose();
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setError(formattedErrors);
                InfoNotification({ message: "Please fill in required field.", variantType: "info" });
            }
            ErrorNotification({ message: "Something went wrong.", variantType: "error" });
        }
    }

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>Re-assign Ticket</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{data.ticket_no}</p>
                    </div>
                    <HeaderModalButton onClose={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%" }}>
                        <label htmlFor="">Choose New PIC <span style={{ color: "red" }}>*</span></label>
                        <SelectOptions
                            label="-- Choose PIC --"
                            name="new_pic"
                            id="new_pic"
                            value={pic}
                            onChangeSelect={(e) => {
                                setPic(e.target.value);
                                clearError("new_pic");
                            }}
                            options={userData.map((e: any) => ({
                                value: e.id,
                                label: e.username
                            }))}
                            style={{ width: "100%", borderColor: error.new_pic ? "red" : "" }}
                        />
                        {error.new_pic && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.new_pic}</span>
                        )}
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