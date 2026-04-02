// import "./home.css";
import Card from "../../components/card/Card";
import { ErrorNotification } from "../../components/notifications/notification";
import { getTicket } from "../../api/ticketApi";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

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

    const { callApi } = useApi();
    const fetchTicket = useCallback(async () => {
        try {
            const res = await callApi("get", "tickets/get-all-ticket");
            setData(res);
        } catch (error: any) {
            ErrorNotification({ message: "Gagal mengambil data.", variantType: "error" });
        }
    }, []);

    useEffect(() => {
        fetchTicket();
        socket.on("ticket-change", () => {
            fetchTicket();
        });

        return () => {
            socket.off("ticket-change");
        }
    }, [fetchTicket]);

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