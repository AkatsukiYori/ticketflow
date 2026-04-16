import Card from "../../components/card/Card";
import { ErrorNotification, SuccessNotification } from "../../components/notifications/notification";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

import ResponseModal from "../../components/modals/response/ResponseModal";
import ConfirmModal from "../../components/modals/confirmModal/ConfirmModal";
import ReopenModal from "../../components/modals/reopen/ReopenModal";

export default function CheckTicketStatus() {
    const [open, setOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [openTicket, setOpenTicket] = useState(false);

    const [ticketNo, setTicketNo] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [ticketSearch, setTicketSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");

    const selectedTicket = data.find(t => t.ticket_no === ticketNo);

    const { callApi } = useApi();
    const fetchTicket = useCallback(async () => {
        try {
            const res = await callApi("get", `tickets/get-all-ticket?status=${false}`);
            setData(res);
        } catch (error: any) {
            ErrorNotification({ message: "Gagal mengambil data.", variantType: "error" });
        }
    }, []);

    const handleModalResponse = (ticketNo: string) => {
        setTicketNo(ticketNo);
        setOpen(true);
    }

    const handleModalClosed = (ticketNo: string) => {
        setConfirmModal(true);
        setTicketNo(ticketNo);
    }

    const handleModalOpenTicket = (ticketNo: string) => {
        setOpenTicket(true);
        setTicketNo(ticketNo);
    }

    async function handleOpenTicket() {
        try {
            const res = await callApi("put", `/tickets/re-open/${ticketNo}`);
            SuccessNotification({ message: res.message, variantType: "success" });
            setOpenTicket(false);
        } catch (error: any) {
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    async function handleCloseTicket() {
        try {
            const res = await callApi("put", `/tickets/close-ticket/${ticketNo}`);
            SuccessNotification({ message: res.message, variantType: "success" });
            setConfirmModal(false);
        } catch (error: any) {
            ErrorNotification({ message: "Terjadi Kesalahan", variantType: "error" })
        }
    }

    async function handleResponTicket(responValue: string) {
        try {
            const payload = {
                isAdmin: false,
                reason: responValue,
                role: "user",
                user_id: null
            }
            await callApi("put", `/tickets/feedback/${ticketNo}`, payload);
            SuccessNotification({ message: "Respon berhasil dikirimkan.", variantType: "success" });
            setOpen(false);
        } catch (error: any) {
            ErrorNotification({ message: "Terjadi Kesalahan", variantType: "error" });
        }
    }

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
                    <Card key={index} data={ticket} onClickClosed={handleModalClosed} onClickResponse={handleModalResponse} onClickOpenTicket={handleModalOpenTicket} />
                ))}
            </section>

            <ResponseModal open={open} onClose={() => setOpen(false)} onClick={handleResponTicket} />
            <ConfirmModal open={confirmModal} onClose={() => setConfirmModal(false)} isTicket={false} message={`Apakah anda yakin ingin menutup tiket #${ticketNo}? Pastikan kendala anda sudah teratasi sebelum menutup tiket. Dengan menutup tiket, ini menandai laporan anda sudah terselesaikan sepenuhnya.`} label="Konfirmasi Tutup Tiket" btnCancel="Batal" btnYes="Tutup Tiket" onConfirm={handleCloseTicket} />
            <ReopenModal open={openTicket} onClose={() => setOpenTicket(false)} data={selectedTicket} onClick={handleOpenTicket} />
        </main>
    );
}