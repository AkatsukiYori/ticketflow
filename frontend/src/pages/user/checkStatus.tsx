import Card from "../../components/card/Card";
import { Notifications } from "../../components/notifications/notification";
import { useCallback, useEffect, useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

import ResponseModal from "../../components/modals/response/ResponseModal";
import ConfirmModal from "../../components/modals/confirmModal/ConfirmModal";
import ReopenModal from "../../components/modals/reopen/ReopenModal";
import LogsModal from "../../components/modals/log/ViewLogs";
import RatingModal from "../../components/modals/rating/RatingModal";

export default function CheckTicketStatus() {
    const { callApi } = useApi();
    const date = new Date();
    const getToday = () => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getFirstDayOfMonth = () => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
    }

    const [open, setOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [openTicket, setOpenTicket] = useState(false);
    const [openLogs, setOpenLogs] = useState(false);
    const [openRating, setOpenRating] = useState(false);

    const [ticketNo, setTicketNo] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [ticketSearch, setTicketSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [startMonth, setStartMonth] = useState(getFirstDayOfMonth());
    const [endMonth, setEndMonth] = useState(getToday());
    const [ticketId, setTicketId] = useState(0);

	console.log(data);
    const selectedTicket = data.find(t => t.ticket_no === ticketNo);

    const fetchTicket = useCallback(async () => {
        try {
            const res = await callApi("get", `tickets/get-all-ticket?status=${false}`);
            setData(res);
        } catch (error: any) {
            Notifications({ message: "Gagal mengambil data.", variantType: "error", persist: false });
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

    const handleModalLogs = (ticketId: number) => {
        setOpenLogs(true);
        setTicketId(ticketId);
    }

    const handleModalRating = (ticketNo: string) => {
        setOpenRating(true);
        setTicketNo(ticketNo);
    }

    async function handleOpenTicket() {
        try {
            const res = await callApi("put", `/tickets/re-open/${ticketNo}`);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpenTicket(false);
        } catch (error: any) {
            Notifications({ message: "Terjadi kesalahan.", variantType: "error", persist: false });
        }
    }

    async function handleCloseTicket() {
        try {
            const res = await callApi("put", `/tickets/close-ticket/${ticketNo}`);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setConfirmModal(false);
        } catch (error: any) {
            Notifications({ message: "Terjadi Kesalahan", variantType: "error", persist: false })
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
            Notifications({ message: "Respon berhasil dikirimkan.", variantType: "success", persist: false });
            setOpen(false);
        } catch (error: any) {
            Notifications({ message: "Terjadi Kesalahan", variantType: "error", persist: false });
        }
    }

    async function handleSubmitRating(ticketNo: string, pesan: string, rating: number) {
        try {
            const payload = {
                score: rating,
                note: pesan,
            }

            const res = await callApi("post", `/tickets/rating/${ticketNo}`, payload);
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpenRating(false);
        } catch (error: any) {
            Notifications({ message: "Terjadi kesalahan.", variantType: "error", persist: false })
        }
    }

    useEffect(() => {
        if((startMonth && endMonth) || ticketSearch || userSearch) {
            const filterTicket = async () => {
                try {
                    const res = await callApi("get", `/tickets/filter-ticket?startMonth=${startMonth}&endMonth=${endMonth}&no=${ticketSearch}&user=${userSearch}`);
                    setData(res);
                } catch (error: any) {
                    Notifications({ message: "Gagal memfilter tiket.", variantType: "error", persist: false });
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
                    <Card key={index} data={ticket} onClickClosed={handleModalClosed} onClickResponse={handleModalResponse} onClickOpenTicket={handleModalOpenTicket} onClickLogs={handleModalLogs} onClickRating={handleModalRating} />
                ))}
            </section>

            <ResponseModal open={open} onClose={() => setOpen(false)} onClick={handleResponTicket} />
            <ConfirmModal open={confirmModal} onClose={() => setConfirmModal(false)} isTicket={false} message={`Apakah anda yakin ingin menutup tiket #${ticketNo}? Pastikan kendala anda sudah teratasi sebelum menutup tiket. Dengan menutup tiket, ini menandai laporan anda sudah terselesaikan sepenuhnya.`} label="Konfirmasi Tutup Tiket" btnCancel="Batal" btnYes="Tutup Tiket" onConfirm={handleCloseTicket} />
            <ReopenModal open={openTicket} onClose={() => setOpenTicket(false)} data={selectedTicket} onClick={handleOpenTicket} />
            <LogsModal open={openLogs} onClose={() => setOpenLogs(false)} ticketId={ticketId} />
            <RatingModal open={openRating} onClose={() => setOpenRating(false)} ticketNo={ticketNo} onClick={handleSubmitRating} />
        </main>
    );
}
