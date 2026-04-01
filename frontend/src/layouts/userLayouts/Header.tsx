import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Styles from "../../css/layouts/user/layouts.module.css";

export default function Header() {
    const navigate = useNavigate();
    const newTicket = () => {
        navigate("/tiket-baru");
    }

    return (
        <header className={Styles['navHeader']}>
            <section className={Styles['section-left']}>
                <div className="logo">
                    <img src={logo} alt="logo" style={{ width: "60px", height: "auto" }} />
                </div>
                <div className="title">
                    <h2 style={{ margin: 0 }}>TicketFlow</h2>
                    <p style={{ margin: 0, fontSize: 15 }}>Sistem HelpDesk Internal</p>
                </div>
            </section>
            <section className={Styles['section-right']}>
                <button type="button" onClick={newTicket}>
                    <span className={Styles['btn-icon']}>+</span>
                    <span className={Styles['btn-text']}>Buat Tiket Baru</span>
                </button>
            </section>
        </header>
    );
}