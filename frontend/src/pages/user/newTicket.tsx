import { useNavigate } from "react-router-dom";
import Styles from "../../css/layouts/user/home.module.css";
import { createTicket, getTicket } from "../../api/ticketApi";
import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";
import { ErrorNotification, InfoNotification, SuccessNotification } from "../../components/notifications/notification";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

export default function NewTicket() {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);
    const [fieldError, setFieldError] = useState<{[key: string]: string}>({});

    const back = () => {
        navigate("/");
    }

    const clearError = (field: string) => {
        setFieldError(prev => ({ ...prev, [field]: "" }));
    };

    const { callApi } = useApi();
    const fetchCategory = useCallback(async () => {
        try {
            const result = await callApi("get", "/categories/get-all-categories");
            setCategory(result);
        } catch (error: any) {
            ErrorNotification({ message: "Gagal memgambil kategori.", variantType: "error" });
        }
    }, [callApi]);

    const fetchTicket = useCallback(async () => {
        try {
            const result = await callApi("get", "/tickets/get-all-ticket");
            setData(result);
        } catch (error: any) {
            ErrorNotification({ message: "Gagal mengambil ticket.", variantType: "error" });
        }
    }, [callApi]);

    useEffect(() => {
        fetchCategory();
        fetchTicket();

        socket.on("category-change", () => {
            fetchCategory();
        });

        socket.on("ticket-change", () => {
            fetchTicket();
        });

        return () => {
            socket.off("category-change");
            socket.off("ticket-change");
        }
    }, [fetchCategory, fetchTicket]);

    const initialForm = {
        ticket_title: "",
        problem: "",
        department: "",
        location: "",
        priority: "low",
        note: "",
        status: "pending",
        category_id: "",
        user: ""
    };

    const [form, setForm] = useState(initialForm);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await callApi("post", `/tickets/new-ticket`, form);
            SuccessNotification({ message: `${res.message} ${res.ticketNo}`, variantType: "success", persist: true });
            setForm({
                ...initialForm,
                category_id: "",
            });
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                InfoNotification({ message: "Mohon lengkapi data yang wajib diisi.", variantType: "info" });
            }
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    return (
        <main className={Styles['main-content-status']}>
            <section className={Styles['content-header']} style={{ borderBottom: "1px solid #f1f1f1" }}>
                <h2 style={{ margin: 0 }}>Buat Tiket Baru</h2>
                <p style={{ margin: 0 }}>Isikan detail permasalahan yang anda alami.</p>
            </section>
            <form onSubmit={handleSubmit}>
                <section className={Styles['content-body']}>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Judul Tiket <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                name="ticket_title"
                                id="ticket_title"
                                placeholder="Masukkan judul tiket"
                                value={form.ticket_title}
                                onChange={(e) => {
                                    setForm({ ...form, ticket_title: e.target.value });
                                    clearError("ticket_title");
                                }}
                                style={{ borderColor: fieldError.ticket_title ? "red" : "" }}
                                required
                            />
                            {fieldError.ticket_title && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.ticket_title}</span>
                            )}
                        </div>
                        <div className={Styles['form']}>
                            <label htmlFor="">Nama Pengguna <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                name="user"
                                id="user"
                                placeholder="Masukkan nama pengguna"
                                value={form.user}
                                onChange={(e) => {
                                    setForm({ ...form, user: e.target.value });
                                    clearError("user");
                                }}
                                style={{ borderColor: fieldError.user ? "red" : "" }}
                                required
                            />
                            {fieldError.user && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.user}</span>
                            )}
                        </div>
                    </div>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Department <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                name="department"
                                id="department"
                                placeholder="Masukkan department"
                                value={form.department}
                                onChange={(e) => {
                                    setForm({ ...form, department: e.target.value });
                                    clearError("department");
                                }}
                                style={{ borderColor: fieldError.department ? "red" : "" }}
                                required
                            />
                            {fieldError.department && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.department}</span>
                            )}
                        </div>
                        <div className={Styles['form']}>
                            <label htmlFor="">Lokasi <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Masukkan lokasi"
                                value={form.location}
                                onChange={(e) => {
                                    setForm({ ...form, location: e.target.value });
                                    clearError("location");
                                }}
                                style={{ borderColor: fieldError.department ? "red" : "" }}
                                required
                            />
                            {fieldError.location && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.location}</span>
                            )}
                        </div>
                    </div>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Kategori <span style={{ color: "red" }}>*</span></label>
                            <select
                                name="category_id"
                                id="category_id"
                                value={form.category_id}
                                onChange={(e) => {
                                    setForm({ ...form, category_id: e.target.value });
                                    clearError("kategori");
                                }}
                                style={{ borderColor: fieldError.department ? "red" : "" }}
                                required
                            >
                                <option value="">-- Pilih Kategori --</option>
                                {category.map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            {fieldError.category_id && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.category_id}</span>
                            )}
                        </div>
                        <div className={Styles['form']}>
                            <label htmlFor="">Catatan Pengguna (Opsional)</label>
                            <input
                                type="text"
                                name="note"
                                id="note"
                                placeholder="Catatan"
                                value={form.note}
                                onChange={(e) => {
                                    setForm({ ...form, note: e.target.value });
                                    clearError("note");
                                }}
                            />
                        </div>
                    </div>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Kendala <span style={{ color: "red" }}>*</span></label>
                            <textarea
                                name="problem"
                                id="problem"
                                placeholder="Jelaskan masalah anda"
                                value={form.problem}
                                onChange={(e) => {
                                    setForm({ ...form, problem: e.target.value });
                                    clearError("problem");
                                }}
                                style={{ borderColor: fieldError.department ? "red" : "" }}
                                required
                            ></textarea>
                            {fieldError.problem && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.problem}</span>
                            )}
                        </div>
                    </div>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Lampiran (Opsional)</label>
                            <input type="file" name="lampiran" id="lampiran" />
                        </div>
                    </div>
                </section>
                <section className={Styles['content-footer']}>
                    <button type="submit" className="btn-submit-ticket">Buat Tiket</button>
                    <button type="button" className="btn-cancel" onClick={back}>Kembali</button>
                </section>
            </form>
        </main>
    );
}