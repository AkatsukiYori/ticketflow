import { useNavigate } from "react-router-dom";
import Banner from "../../assets/mainImage.png";
import { NewTicketButton } from "../../components/buttons/Button";
import "./home.css";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="main-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
            <section style={{ width: "50rem", height: "30em" }}>
                    <h1>HELPDESK INTERNAL <div style={{ color: "#1B499D" }}>PT. PAPASARI</div></h1>
                    <p style={{ marginTop: 0, marginBottom: "16px" }}>Digunakan oleh seluruh tim internal untuk memastikan layanan IT berjalan cepat, transparan dan terdokumentasi.</p>
                    <p style={{ marginTop: 0, marginBottom: "36px" }}>Setiap tiket tercatat, diprioritaskan dan ditangan oleh tim IT terkait.</p>
                    <div className="actions">
                        <NewTicketButton onClick={() => navigate("tiket-baru")} />
                        <button type="button" onClick={() => navigate("cek-status-tiket")} >Cek Status Tiket</button>
                    </div>
            </section>
            <section>
                <img src={Banner} alt="Banner" />
            </section>
        </div>
    );
}