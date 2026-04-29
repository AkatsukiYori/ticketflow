import { useNavigate } from "react-router-dom";
import Banner from "../../assets/mainImage.png";
import { Buttons } from "../../components/buttons/Button";
import Styles from "../../css/layouts/user/home.module.css";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <main className={Styles['main-content']}>
            <section className={Styles['hero-content']}>
                <h1>HELPDESK INTERNAL <span style={{ color: "#1B499D" }}>PT. PAPASARI</span></h1>
                <p style={{ marginTop: 0, marginBottom: "16px" }}>Digunakan oleh seluruh tim internal untuk memastikan layanan IT berjalan cepat, transparan dan terdokumentasi.</p>
                <p style={{ marginTop: 0, marginBottom: "36px" }}>Setiap tiket tercatat, diprioritaskan dan ditangan oleh tim IT terkait.</p>
                <div className={Styles['actions']}>
                    <Buttons onClick={() => navigate("tiket-baru")} label="Buat Tiket Baru" btnTitle="Buat Tiket Baru" func="new-ticket" />
                    <button type="button" onClick={() => navigate("cek-status-tiket")} title="Cek Status Tiket">Cek Status Tiket</button>
                </div>
            </section>
            <section className={Styles['hero-banner']}>
                <img src={Banner} alt="Banner" />
            </section>
        </main>
    );
}