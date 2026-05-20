import logo from "../../assets/logo.webp";
import Styles from "../../css/layouts/user/layouts.module.css";

export default function Header() {
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
        </header>
    );
}