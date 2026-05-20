import Styles from "./reassignTicket.module.css";
import { Buttons } from "../../buttons/Button";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { Notifications } from "../../notifications/notification";
import { InputText, SelectOptions } from "../../inputs/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
    open: boolean;
    onClose: () => void;
    data?: any;
    isReassign: boolean;
    userId: string;
}

export default function ReassignModal({ open, onClose, data, isReassign, userId }: Props) {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const [pic, setPic] = useState("");
    const [priority, setPriority] = useState("");
    const [estimate, setEstimate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ pic?: string, priority?: any, estimate?: string }>({});
    
    const validate = () => {
        const newError: {pic?: string, priority?: any, estimate?: string} = {};
        if(!pic && isReassign) {
            newError.pic = "PIC cannot be empty.";
        }

        if(!priority) {
            newError.priority = "Priority cannot be empty.";
        }

        if(!estimate) {
            newError.estimate = "Estimate cannot be empty.";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleClear = () => {
        setError({});
        setPic("");
        setPriority("");
        setEstimate("");
    }

    const fetchUser = async () => {
        return await callApi("get", "/users/get-all-user");
    }

    const { data: userData = [] } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60
    })

    useEffect(() => {
        if(open) {
            handleClear();
        }
    }, [open]);

    const handleSubmitMutation = useMutation({
        mutationFn: async (payload: any) => {
            
            return await callApi("put", `/tickets/assign/${data?.ticket_no}`, payload);
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
        },
        onError: () => {
            Notifications({ message: "Something went wrong.", variantType: "error", persist: false });
        }
    });

    function handleSubmit() {
        if(!validate()) return;
        setLoading(true);
        const payload = {
            user_id: pic ? pic : userId,
            priority: priority,
            estimate: estimate
        };
        handleSubmitMutation.mutate(payload);
    }

    if(!open) return null;

    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>{isReassign ? "Re-assign Ticket" : "Assign Ticket"}</h2>
                        <p style={{ margin: 0 }}>Ticket No : #{data?.ticket_no}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: isReassign ? "block" : "none" }}>
                            <label htmlFor="">New PIC <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                name="pic"
                                id="pic"
                                placeholder="Choose PIC"
                                searchAble={true}
                                value={
                                    pic ? {
                                        value: pic,
                                        label:
                                            userData.find((u: any) => u.id === pic)?.username || ""
                                    } : null
                                }
                                onChangeSelect={(e) => {
                                    setPic(e ? e.value : "");
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
                                name="priority"
                                id="priority"
                                placeholder="Choose Priority"
                                searchAble={false}
                                value={
                                    priority ? {
                                        value: priority,
                                        label: 
                                            priority.charAt(0).toUpperCase() + priority.slice(1)
                                    } : null
                                }
                                onChangeSelect={(e) => {
                                    setPriority(e ? e.value : "");
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
                        <div>
                            <label htmlFor="">Estimate <span style={{ color: "red" }}>*</span></label>
                            <InputText
                                type="date"
                                name="estimate"
                                id="estimate"
                                placeholder="Estimate ticket"
                                value={estimate}
                                onChangeInput={(e) => {
                                    setEstimate(e.target.value);
                                    if(error.estimate) setError(prev => ({ ...prev, estimate: "" }));
                                }}
                                style={{ width: "100%", marginTop: "4px", borderColor: error.estimate ? "red" : "" }}
                            />
                            {error.estimate && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{error.estimate}</span>
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