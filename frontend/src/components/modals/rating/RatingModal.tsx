import { Buttons } from "../../buttons/Button";
import Styles from "../../../css/layouts/admin/modal.module.css";
import { InputText } from "../../inputs/Input";
import React, { useState } from "react";

type Props = {
    open: boolean;
    ticketNo: string;
    onClose: () => void;
    onClick: (ticketNo: string, pesan: string, point: number) => void;
}

export default function RatingModal({ open, ticketNo, onClose, onClick } : Props) {
    const [pesan, setPesan] = useState("");
    const [rating, setRating] = useState(0);

    const handleRatingClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const selectedPoint = Number(e.currentTarget.dataset.key);
        setRating(selectedPoint);
    }

    return (
        <section className={`${Styles['modal-overlay']} ${open ? Styles['modal-overlay-show'] : "hide"}`}>
            <section className={`${Styles['modal-popup']} ${open ? Styles['modal-popup-show'] : "hide"}`}>
                <div className={Styles['modal-header']}>
                    <div style={{ textAlign: "left" }}>
                        <h2 style={{ margin: 0 }}>Rating</h2>
                        <p style={{ margin: 0 }}>No Tiket : #{ticketNo}</p>
                    </div>
                    <Buttons label="X" func="header-close" btnTitle="Close" onClick={onClose} />
                </div>
                <div className={Styles['modal-body']}>
                    <div className={Styles['rating']}>
                        <label htmlFor="">Point</label>
                        <div className={Styles['rating-point']}>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} data-key={num} className={`
                                    ${Styles[`rating-${num}`]}
                                    ${num === rating ? Styles['active'] : ""}
                                `} onClick={handleRatingClick}>
                                    <span>{num}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={Styles['pesan']}>
                        <label htmlFor="">Pesan (Opsional)</label>
                        <InputText
                            name="pesan"
                            id="pesan"
                            placeholder="Masukkan pesan"
                            value={pesan}
                            onChangeInput={(e) => setPesan(e.target.value)}
                            style={{ width: "100%" }} />
                    </div>
                </div>
                <div className={Styles['modal-footer']}>
                    <Buttons label="Submit" func="submit" btnTitle="Submit" onClick={() => onClick(ticketNo, pesan, rating)} />
                    <Buttons label="Cancel" func="cancel" btnTitle="Cancel" onClick={onClose} />
                </div>
            </section>
        </section>
    );
}