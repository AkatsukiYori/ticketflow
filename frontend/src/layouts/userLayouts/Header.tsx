import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NewTicketButton } from "../../components/buttons/Button";

export default function Header() {
    const navigate = useNavigate();
    const newTicket = () => {
        navigate("/tiket-baru");
    }

    return (
        <header style={{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", backgroundColor: "white", color: "#374151" }}>
            <section style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="logo">
                    <img src={logo} alt="logo" style={{ width: "60px", height: "auto" }} />
                </div>
                <div className="title">
                    <h2 style={{ margin: 0 }}>TicketFlow</h2>
                    <p style={{ margin: 0, fontSize: 15 }}>Sistem HelpDesk Internal</p>
                </div>
            </section>
            <section>
                <NewTicketButton onClick={newTicket} />
            </section>
        </header>
    );
}