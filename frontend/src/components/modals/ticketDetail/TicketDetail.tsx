import { useCallback, useEffect, useState } from "react";
import { CancelButton, HeaderModalButton, TextAssignButton } from "../../buttons/Button";
import Styles from "./ticketDetail.module.css";
import { useApi } from "../../../hooks/useApi";
import { ErrorNotification, SuccessNotification } from "../../notifications/notification";
import ReassignModal from "../reassign/ReassignTicket";

type Props = {
    open: boolean;
    data: any;
    onClose: () => void;
    userRole?: string;
}

export default function TicketDetailModal({ open, data, onClose, userRole }: Props) {
    const [userID, setUserID] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isAlreadyAssign, setIsAlreadyAssign] = useState(
        data?.assign_to !== null && data?.assign_to !== undefined
    );
    const [category, setCategory] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isIKB, setIsIKB] = useState(false);

    const { callApi } = useApi();

    const fetchUser = useCallback(async (name: string) => {
        if(!name) return;

        try {
            const result = await callApi("get", `/users/get-user/${name}`);
            setUserID(result.id);
        } catch (error: any) {
            ErrorNotification({ message: "Failed to fetch data.", variantType: "error" });
        }
    }, [callApi]);

    async function handleUpdate() {
        const payload = {
            user_id: userID
        };

        try {
            const res = await callApi("put", `/tickets/assign/${data.ticket_no}`, payload);
            SuccessNotification({ message: res.message, variantType: "success" });  
            setIsAlreadyAssign(true);
            onClose();
        } catch (error: any) {
            ErrorNotification({ message: "Somthing went wrong.", variantType: "error" });
        }
    }

    async function fetchCategory() {
        try {
            const res = await callApi("get", "/categories/get-all-categories");
            setCategory(res);
        } catch (error: any) {
            ErrorNotification({ message: "Something went wrong.", variantType: "error" });
        }
    }

    const handleSubmit = () => {
        if(isAlreadyAssign) {
            setOpenModal(true);
        } else {
            handleUpdate();
        }
    }

    useEffect(() => {
        if(open) {
            fetchCategory();
        }
    }, [fetchCategory]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if(storedUsername) {
            fetchUser(storedUsername);
        }
    }, [fetchUser]);

    useEffect(() => {
        const isAssign = data.assign_to !== null && data.assign_to !== undefined;
        setIsAlreadyAssign(isAssign);

        if(category.length > 0 && data.category_id) {
            const selectedCategory = category.find(c => c.id === data.category_id);

            if(selectedCategory) {
                setCategoryName(selectedCategory.name);
                setIsIKB(selectedCategory.name.toLowerCase() === "ikb");
            }
        }
    }, [category, data]);
    return (
        <div className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <div className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div>
                        <h2 style={{ margin: 0 }}>Ticket Detail</h2>
                        <p style={{ margin: 0 }}>#{data.ticket_no}</p>
                    </div>
                    <HeaderModalButton onClose={onClose} label="X" />
                </div>
                <div className={Styles['modal-body']}>
                    <div className={Styles['modal-body-content']}>
                        <h4>Information</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Ticket No</td>
                                    <td>{data.ticket_no}</td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>{new Date(data.report_date).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Asia/Jakarta"
                                    }).replaceAll(/\./g, ":")}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{data.status}</td>
                                </tr>
                                <tr>
                                    <td>Priority</td>
                                    <td>{data.priority}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Reported By</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>User</td>
                                    <td>{data.user}</td>
                                </tr>
                                <tr>
                                    <td>Whatsapp No</td>
                                    <td>{data.no_wa}</td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>{data.department}</td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{data.location}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles['modal-body-content']}>
                        <h4>Additional</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Category</td>
                                    <td>{categoryName}</td>
                                </tr>
                                {isIKB && (
                                    <>
                                        <tr>
                                            <td>Modul</td>
                                            <td>{data.modul}</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Modul</td>
                                            <td>{data.sub_modul}</td>
                                        </tr>
                                    </>
                                )}
                                <tr>
                                    <td>Ticket Title</td>
                                    <td>{data.ticket_title}</td>
                                </tr>
                                <tr>
                                    <td>Problem</td>
                                    <td>{data.problem}</td>
                                </tr>
                                <tr>
                                    <td>Note</td>
                                    <td>{data.note ? data.note : "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    {userRole === "admin" && (
                        <TextAssignButton onClick={handleSubmit} label={isAlreadyAssign ? "Re-assign" : "Apply"} />
                    )}
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>

            <ReassignModal open={openModal} onClose={() => setOpenModal(false)} data={data} isReassign={true} userId={userID} />
        </div>
    );
}