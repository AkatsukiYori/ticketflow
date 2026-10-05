import { useState } from "react";
import { Buttons } from "../../buttons/Button";
import { CustomCheckbox } from "../../inputs/Input";
import Styles from "./kpiDetailModal.module.css";

type Ticket = {
    id: number;
    ticket_title: string;
    problem: string;
    report_date: string;
    status: string;
}

type Props = {
    open: boolean;
    unregisterTickets?: Ticket[];
    registerTickets?: Ticket[];
    kpiId: number;
    onClose: () => void;
    onUnregister: (kpi_id: number) => void;
    onRegister: (tickets: number[]) => void;
    onSearch: (ticketTitle: string) => void;
}

export default function KpiDetailModal({ open, unregisterTickets = [], registerTickets = [], onClose, onRegister, onUnregister, kpiId, onSearch } : Props) {
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    const [selectedTicketsRegister, setSelectedTicketsRegister] = useState<number[]>([]);
    const [selectedTicketsUnregister, setSelectedTicketsUnregister] = useState<number[]>([]);

    const handleSelectTicketRegister = (ticketId: number) => {
        setSelectedTicketsRegister((prev) => {
            if(prev.includes(ticketId)) {
                return prev.filter((id) => id !== ticketId);
            }

            return [...prev, ticketId];
        });
    }

    const handleSelectTicketUnregister = (ticketId: number) => {
        setSelectedTicketsUnregister((prev) => {
            if(prev.includes(ticketId)) {
                return prev.filter((id) => id !== ticketId);
            }

            return [...prev, ticketId];
        });
    }

    if(!open) return null;

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <h2>Assign Ticket to KPI</h2>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']} style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "600px", overflowY: "auto", scrollbarWidth: "none" }}>
                    {/* <p style={{ marginTop: "0" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, consequatur.</p> */}
                    <div className={Styles['container-tickets']}>
                        <div className={Styles['unregistered-tickets']}>
                            <div style={{ flex: "0 0 auto" }}>
                                <h3 style={{ margin: 0, textAlign: "center" }}>Unregistered Tickets</h3>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Search ticket..."
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "auto", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px" }}>
                                {unregisterTickets.length > 0 ?
                                    (unregisterTickets.map((item, index) => {
                                        const isChecked = selectedTicketsRegister.includes(item.id);

                                        return (
                                            <div key={index} className={Styles['ticket-box']} onClick={() => handleSelectTicketRegister(item.id)}>
                                                <div>
                                                    <CustomCheckbox
                                                        checked={isChecked}
                                                        onChangeCheckbox={() => handleSelectTicketRegister(item.id)}
                                                    />
                                                </div>
                                                <div className={Styles['ticket-desc']}>
                                                    <h3>{truncateText(item.ticket_title, 30)}</h3>
                                                    <p>{truncateText(item.problem, 50)}</p>
                                                </div>
                                                <div>
                                                    {new Date(item.report_date).toLocaleString("en-Us", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        timeZone: "Asia/Jakarta"
                                                    })}
                                                </div>    
                                            </div>
                                        )
                                    }))
                                    : (
                                        <p style={{ textAlign: "center" }}>No Tickets</p>
                                    )
                                }
                            </div>
                            <div style={{ flex: "0 0 auto" }}>
                                <Buttons
                                    btnTitle="Register"
                                    label="Register"
                                    func="register"
                                    style={{
                                        width: "100%",
                                        ...(selectedTicketsRegister.length === 0 && {
                                            opacity: 0.7,
                                            cursor: "not-allowed"
                                        })
                                    }}
                                    onClick={() => {
                                        onRegister(selectedTicketsRegister);
                                        setSelectedTicketsRegister([]);
                                    }}
                                    isDisabled={selectedTicketsRegister.length > 0 ? false : true}
                                />
                            </div>
                        </div>
                        <div className={Styles['registered-tickets']}>
                            <div style={{ flex: "0 0 auto" }}>
                                <h3 style={{ margin: 0, textAlign: "center" }}>Registered Tickets</h3>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Search ticket..."
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "auto", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px" }}>
                                {registerTickets.length > 0 ?
                                    (registerTickets.map((item, index) => {
                                        const isChecked = selectedTicketsUnregister.includes(item.id);

                                        return (
                                            <div key={index} className={Styles['ticket-box']} onClick={() => handleSelectTicketUnregister(item.id)}>
                                                <div>
                                                    <CustomCheckbox
                                                        checked={isChecked}
                                                        onChangeCheckbox={() => handleSelectTicketUnregister(item.id)}
                                                    />
                                                </div>
                                                <div className={Styles['ticket-desc']}>
                                                    <h3>{truncateText(item.ticket_title, 30)}</h3>
                                                    <p>{truncateText(item.problem, 50)}</p>
                                                </div>
                                                <div>
                                                    {new Date(item.report_date).toLocaleString("en-Us", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        timeZone: "Asia/Jakarta"
                                                    })}
                                                </div>    
                                            </div>
                                        )
                                    }))
                                    : (
                                        <p style={{ textAlign: "center" }}>No Tickets</p>
                                    )
                                }
                            </div>
                            <div style={{ flex: "0 0 auto" }}>
                                <Buttons
                                    btnTitle="Unregister"
                                    label="Unregister"
                                    func="unregister"
                                    style={{
                                        width: "100%",
                                        ...(selectedTicketsUnregister.length === 0 && {
                                            opacity: 0.7,
                                            cursor: "not-allowed"
                                        })
                                    }}
                                    onClick={() => {
                                        onUnregister(kpiId);
                                        setSelectedTicketsUnregister([]);
                                    }}
                                    isDisabled={selectedTicketsUnregister.length > 0 ? false : true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Cancel" btnTitle="Cancel" func="cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}