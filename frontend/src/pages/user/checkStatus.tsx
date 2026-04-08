import Card from "../../components/card/Card";
import { ErrorNotification } from "../../components/notifications/notification";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

export default function CheckTicketStatus() {
    const [data, setData] = useState<any[]>([]);
    const [ticketSearch, setTicketSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");

    const { callApi } = useApi();
    const fetchTicket = useCallback(async () => {
        try {
            const res = await callApi("get", `tickets/get-all-ticket?status=${false}`);
            setData(res);
        } catch (error: any) {
            ErrorNotification({ message: "Gagal mengambil data.", variantType: "error" });
        }
    }, []);

    useEffect(() => {
        if((startMonth && endMonth) || ticketSearch || userSearch) {
            const filterTicket = async () => {
                try {
                    const res = await callApi("get", `tickets/filter-ticket?startMonth=${startMonth}&endMonth=${endMonth}&title=${ticketSearch}&user=${userSearch}`);
                    setData(res);
                } catch (error: any) {
                    ErrorNotification({ message: "Gagal memfilter tiket.", variantType: "error" });
                }
            };
            filterTicket();
        } else {
            fetchTicket();
                socket.on("ticket-change", () => {
                    fetchTicket();
                });

                return () => {
                    socket.off("ticket-change");
                }
            }
    }, [startMonth, endMonth, ticketSearch, userSearch, fetchTicket, callApi]);

    return (
        <main className={Styles['main-content-status']}>
            <section className={Styles['content-header']}>
                <h2 style={{ marginBottom: 0 }}>Cek Status Tiket</h2>
                <p style={{ marginTop: 0 }}>Cek tiket anda untuk melihat status dan perkembangan penanganan tiket.</p>

                <div className={Styles['filter']}>
                    <InputText type="text" placeholder="Cari nomor tiket..." value={ticketSearch} onChangeInput={(e) => setTicketSearch(e.target.value)} />
                    <InputText type="text" placeholder="Cari nama pengguna..." value={userSearch} onChangeInput={(e) => setUserSearch(e.target.value)} />
                    <InputText type="date" value={startMonth} onChangeInput={(e) => setStartMonth(e.target.value)} />
                    <InputText type="date" value={endMonth} onChangeInput={(e) => setEndMonth(e.target.value)} />
                </div>
            </section>
            <section className={Styles['content-body']}>
                {data.map((ticket, index) => (
                    <Card key={index} data={ticket} />
                ))}
            </section>
        </main>
    );
}