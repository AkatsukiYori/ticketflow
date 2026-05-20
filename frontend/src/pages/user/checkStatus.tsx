import Card from "../../components/card/Card";
import { Notifications } from "../../components/notifications/notification";
import { useState } from "react";
import { InputText } from "../../components/inputs/Input";
import Styles from "../../css/layouts/user/home.module.css";
import { useApi } from "../../hooks/useApi";

import ResponseModal from "../../components/modals/response/ResponseModal";
import ConfirmModal from "../../components/modals/confirmModal/ConfirmModal";
import ReopenModal from "../../components/modals/reopen/ReopenModal";
import LogsModal from "../../components/modals/log/ViewLogs";
import RatingModal from "../../components/modals/rating/RatingModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CheckTicketStatus() {
    const { callApi } = useApi();
    const queryClient = useQueryClient();

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
    const [ticketSearch, setTicketSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [startMonth, setStartMonth] = useState(getFirstDayOfMonth());
    const [endMonth, setEndMonth] = useState(getToday());
    const [ticketId, setTicketId] = useState(0);

    const fetchTicket = async () => {
        const isFiltering = ticketSearch || userSearch || startMonth || endMonth;

        const url = isFiltering ?
            `tickets/filter-ticket?startMonth=${startMonth}&endMonth=${endMonth}&no=${ticketSearch}&user=${userSearch}` :
            `tickets/get-all-ticket?status=${false}`;


        const res = await callApi("get", url);
        return Array.isArray(res) ? res : res?.data || [];
    };

    const { data = [] } = useQuery({
        queryKey: ['ticket', startMonth, endMonth, ticketSearch, userSearch],
        queryFn: fetchTicket,
        refetchOnWindowFocus: true,
        staleTime: Infinity
    });

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

    const handleOpenTicketMutation = useMutation({
        mutationFn: async () => {
            return await callApi("put", `/tickets/re-open/${ticketNo}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpenTicket(false);

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Terjadi kesalahan.", variantType: "error", persist: false });
        }
    })

    function handleOpenTicket() {
        handleOpenTicketMutation.mutate();
    }

    const handleCloseTicketMutation = useMutation({
        mutationFn: async () => {
            return await callApi("put", `/tickets/close-ticket/${ticketNo}`);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            setConfirmModal(false);

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Terjadi Kesalahan", variantType: "error", persist: false })
        }
    })

    function handleCloseTicket() {
        handleCloseTicketMutation.mutate();
    }

    const handleResponseTicketMutation = useMutation({
        mutationFn: async (payload: any) => {
            return await callApi("put", `/tickets/feedback/${ticketNo}`, payload);
        },
        onSuccess: () => {
            Notifications({ message: "Respon berhasil dikirimkan.", variantType: "success", persist: false });
            setOpen(false);

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });
        },
        onError: () => {
            Notifications({ message: "Terjadi Kesalahan", variantType: "error", persist: false });
        }
    })

    function handleResponTicket(responValue: string) {
        const payload = {
            isAdmin: false,
            reason: responValue,
            role: "user",
            user_id: null
        }

        handleResponseTicketMutation.mutate(payload);
    }

    const handleSubmitRatingMutation = useMutation({
        mutationFn: async ({ticketNo, payload}: { ticketNo: string, payload: any }) => {
            return await callApi("post", `/tickets/rating/${ticketNo}`, payload);
        },
        onSuccess: (res) => {
            Notifications({ message: res.message, variantType: "success", persist: false });
            setOpenRating(false);

            queryClient.invalidateQueries({
                queryKey: ['ticket']
            });
        },
        onError: (_error: any) => {
            Notifications({ message: "Terjadi   kesalahan.", variantType: "error", persist: false })
        }
    })

    function handleSubmitRating(_ticketNo: string, pesan: string, rating: number) {
        const payload = {
            score: rating,
            note: pesan,
        }

        handleSubmitRatingMutation.mutate({ticketNo, payload});
    }

    const selectedTicket = data?.find((t: any) => t.ticket_no === ticketNo);

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
                {data.map((ticket: any, index: number) => (
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
