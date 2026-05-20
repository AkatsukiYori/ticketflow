import Styles from "./confirmModal.module.css";
import { Buttons } from "../../buttons/Button";
import { TriangleAlertIcon, CircleQuestionMark } from "lucide-react";
import { Notifications } from "../../notifications/notification";
import { useApi } from "../../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
    open: boolean;
    isTicket?: boolean;
    isAssign?: boolean;
    data?: any;
    onConfirm?: () => void;
    onClose: () => void;
    message?: string;
    label: string;
    btnCancel: string;
    btnYes: string;
}

export default function ConfirmModal({ open, onConfirm, onClose, isTicket, data, message, isAssign, label, btnYes, btnCancel } : Props) {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

    const username = localStorage.getItem("username") || "";

    const fetchUser = async () => {
        return await callApi("get", `/users/get-user/${username}`);
    }

    const { data: userData } = useQuery({
        queryKey: ["user", username],
        queryFn: fetchUser,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60,
        enabled: !!username
    });

    const handleUpdateMutation = useMutation({
        mutationFn: async (payload: any) => {
            return await callApi("put", `/tickets/assign/${data?.ticket_no}`, payload);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            onClose();

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });

            queryClient.invalidateQueries({
                queryKey: ['ticket-detail', data?.id]
            })
        },
        onError: (_error: any) => {
            Notifications({ message: "Something Went Wrong.", variantType: "error", persist: false });
        }
    });

    function handleUpdate() {
        const payload = {
            user_id: userData?.id
        };
        
        handleUpdateMutation.mutate(payload);
    }

    const handleRemoveMutataion = useMutation({
        mutationFn: async () => {
            return await callApi("put", `/tickets/delete-ticket/${data?.id}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            onClose();

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            })
        },
        onError: (_error: any) => {
            Notifications({ message: "Something Went Wrong.", variantType: "error", persist: false });
        }
    })

    function handleRemove() {
        handleRemoveMutataion.mutate();
    }

    const handleSubmit = () => {
        if(isTicket) {
            if(isAssign) {
                handleUpdate();
            } else {
                handleRemove();
            }
        } else if(onConfirm) {
            onConfirm();
        }
    }

    if(!open) return null;

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>{isTicket ? <CircleQuestionMark /> : <TriangleAlertIcon />} {label}</h3>
                    <p style={{ marginTop: "10px", marginBottom: 0, textAlign: "center" }}>{isTicket === false ? message : isAssign ? `Ticket no ${data?.ticket_no} will assign to you.` : `Ticket no ${data?.ticket_no} will be removed.` }</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <Buttons label="Yes" btnTitle={btnYes} func="submit" onClick={handleSubmit} />
                    <Buttons label="Cancel" btnTitle={btnCancel} func="cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}