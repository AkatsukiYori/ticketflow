import logo from "../../assets/logo.webp";
import Styles from "../../css/layouts/user/layouts.module.css";
import { Buttons } from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className={Styles['navHeader']}>
            <section className={Styles['section-left']}>
                <div className="logo">
                    <img src={logo} alt="logo" loading="lazy" style={{ width: "60px", height: "auto" }} />
                </div>
                <div className="title">
                    <h2 style={{ margin: 0 }}>TicketFlow</h2>
                    <p style={{ margin: 0, fontSize: 15 }}>Sistem HelpDesk Internal</p>
                </div>
            </section>
            <section>
                <Buttons label="Beranda" func="home" btnTitle="Beranda" onClick={() => navigate("/")} />
            </section>
        </header>
    );
}