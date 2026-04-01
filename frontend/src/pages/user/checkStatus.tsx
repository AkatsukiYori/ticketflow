// import "./home.css";
import Card from "../../components/card/Card";
import { ErrorNotification } from "../../components/notifications/notification";
import { getTicket } from "../../api/ticketApi";
import { useEffect, useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";

export default function CheckTicketStatus() {
    const [data, setData] = useState<any[]>([]);
    const [ticketSearch, setTicketSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const filteredTicket = data.filter((ticket) => {
        return (
            ticket.ticket_no.toLowerCase().includes(ticketSearch.toLowerCase()) &&
            ticket.user.toLowerCase().includes(userSearch.toLowerCase())
        );
    });

    useEffect(() => {
        fetchTicket();
    }, []);

    async function fetchTicket() {
        try {
            const res = await getTicket();
            setData(res.data);
        } catch (error) {
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    return (
        <main className={Styles['main-content-status']}>
            <section className={Styles['content-header']}>
                <h2 style={{ marginBottom: 0 }}>Cek Status Tiket</h2>
                <p style={{ marginTop: 0 }}>Cek tiket anda untuk melihat status dan perkembangan penanganan tiket.</p>

                <div className={Styles['filter']}>
                    <InputText type="text" placeholder="Cari nomor tiket..." value={ticketSearch} onChangeInput={(e) => setTicketSearch(e.target.value)} />
                    <InputText type="text" placeholder="Cari nama pengguna..." value={userSearch} onChangeInput={(e) => setUserSearch(e.target.value)} />
                </div>
            </section>
            <section className={Styles['content-body']}>
                {filteredTicket.map((ticket, index) => (
                    <Card key={index} data={ticket} />
                ))}
            </section>
        </main>
    );
}