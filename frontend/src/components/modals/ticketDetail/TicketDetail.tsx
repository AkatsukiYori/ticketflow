import { CancelButton, HeaderModalButton, TextAssignButton } from "../../buttons/Button";
import Styles from "./ticketDetail.module.css";

type Props = {
    open: boolean;
    data: any;
    onClose: () => void;
}

export default function TicketDetailModal({ open, data, onClose }: Props) {
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
                                    <td>{data.report_date}</td>
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
                                    <td>{data.category_id}</td>
                                </tr>
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
                    <TextAssignButton />
                    <CancelButton onClose={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}