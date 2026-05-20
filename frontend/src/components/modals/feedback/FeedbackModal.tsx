import Styles from "./feedback.module.css";
import { Buttons } from "../../buttons/Button";
import { useEffect, useState } from "react";
import { InputText, CustomCheckbox } from "../../inputs/Input";
import { useApi } from "../../../hooks/useApi";
import { Notifications } from "../../notifications/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
    open: boolean;
    mode: string;
    onClose: () => void;
    ticket?: any;
    userRole: string;
}

export const FeedbackModal = ({ open, onClose, mode, ticket, userRole }: Props) => {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const [reason, setReason] = useState("");
    const [error, setError] = useState<{ reason?: string; estimate?: string; }>({});
    const [isDoc, setIsDoc] = useState<boolean>(false);

    const username = localStorage.getItem("username") || "";

    const validate = () => {
        const newError: { reason?: string; estimate?: string } = {};
        if(!reason.trim()) {
            newError.reason = mode === "feedback" ? "Feedback cannot be empty." : "Reject reason cannot be empty."
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setReason("");
        setError({});
        setIsDoc(false);
    }

    const fetchUser = async () => {
        return await callApi("get", `/users/get-user/${username}`);
    }

    const { data: userData } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        refetchOnWindowFocus: true,
        staleTime: Infinity,
    })

    const handleSubmitMutation = useMutation({
        mutationFn: async (payload: any) => {
            if(mode === "reject") {
                return await callApi("put", `/tickets/reject-ticket/${ticket?.ticket_no}`, payload);
            } else {
                return await callApi("put", `/tickets/feedback/${ticket?.ticket_no}`, payload);
            }
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            handleClear();
            onClose();

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });

            queryClient.invalidateQueries({
                queryKey: ['ticket-detail', ticket?.id]
            })
        },
        onError: (_error: any) => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleSubmit() {
        if(!validate()) return;

        const payloadReject = {
            reason: reason
        };

        const payloadFeedback = {
            reason: reason,
            role: "admin",
            user_id: userData?.id,
            make_doc: isDoc
        }

        if(mode === "reject") {
            handleSubmitMutation.mutate(payloadReject);
        } else {
            handleSubmitMutation.mutate(payloadFeedback);
        }
    }

    useEffect(() => {
        if(open) {
            handleClear();
        }
    }, [open]);

    if(!open) return null;

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div style={{ textAlign: "left" }}>
                        <h2 style={{ margin: 0 }}>{mode === "feedback" ? "Feedback" : "Reject Ticket" }</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{ticket?.ticket_no}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label htmlFor="">{mode === "feedback" ? "Feedback" : "Reason"} <span style={{ color: "red" }}>*</span></label>
                            <InputText
                                name="reason"
                                id="reason"
                                placeholder={mode === "feedback" ? "Feedback" : "Reason"}
                                value={reason}
                                onChangeInput={(e) => {
                                    setReason(e.target.value);
                                    if(error.reason) setError(prev => ({ ...prev, reason: "" }));
                                }}
                                style={{ width: "100%", marginTop: "4px", borderColor: error.reason ? "red" : "" }}
                            />
                            {error.reason && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.reason}</span>
                            )}
                        </div>

                        {userRole === "admin" && (
                            <div style={{ display: mode === "feedback" ? "block" : "none" }}>
                                <CustomCheckbox
                                    label="Add to documentation ?"
                                    checked={isDoc}
                                    onChangeCheckbox={(e) => setIsDoc(e)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label={mode === "reject" ? "Reject" : "Feedback"} func="submit" btnTitle="Submit" onClick={handleSubmit} />
                    <Buttons label="Cancel" func="cancel" btnTitle="Cancel" onClick={onClose} />
                </div>
            </div>
        </div>
    );
}