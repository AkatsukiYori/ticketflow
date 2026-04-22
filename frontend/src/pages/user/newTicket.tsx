import { useNavigate } from "react-router-dom";
import Styles from "../../css/layouts/user/home.module.css";
import { useCallback, useEffect, useState } from "react";
import { ErrorNotification, InfoNotification, SuccessNotification } from "../../components/notifications/notification";
import { useApi } from "../../hooks/useApi";
import { socket } from "../../api/socket";

export default function NewTicket() {
    const navigate = useNavigate();
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

    useEffect(() => {
        fetchCategory();

        socket.on("category-change", () => {
            fetchCategory();
        });

        return () => {
            socket.off("category-change");
            socket.off("ticket-change");
        }
    }, [fetchCategory]);

    const initialForm = {
        ticket_title: "",
        problem: "",
        department: "",
        location: "",
        priority: "",
        note: "",
        status: "pending",
        category_id: "",
        user: "",
        modul: "",
        sub_modul: "",
        no_wa: ""
    };
    const [form, setForm] = useState(initialForm);
    const selectedCategoryName = category.find(c => c.id == form.category_id)?.name.toLowerCase();
    const isIKB = selectedCategoryName === "ikb";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(isIKB) {
            const errors: {[key: string]: string } = {};
            if(!form.modul.trim()) errors.modul = "Modul tidak boleh kosong.";
            if(!form.sub_modul.trim()) errors.sub_modul = "Modul tidak boleh kosong.";

            if(Object.keys(errors).length > 0) {
                setFieldError(errors);
                InfoNotification({ message: "Mohon isi detail modul dan submodul IKB.", variantType: "info" });
                return;
            }
        }
        try {
            const payload = {
                ...form,
                modul: isIKB ? form.modul : undefined,
                sub_modul: isIKB ? form.sub_modul : undefined
            }

            const res = await callApi("post", `/tickets/new-ticket`, payload);
            SuccessNotification({ message: `${res.message} ${res.ticketNo}`, variantType: "success", persist: true });
            setForm(initialForm);
            setFieldError({});
        } catch (error: any) {
            console.log(error);
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                console.log(formattedErrors);
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
                        <div className={Styles['form']}>
                            <label htmlFor="">Nomor WA <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                name="no_wa"
                                id="no_wa"
                                placeholder="Masukkan nama pengguna"
                                value={form.no_wa}
                                onChange={(e) => {
                                    setForm({ ...form, no_wa: e.target.value });
                                    clearError("no_wa");
                                }}
                                style={{ borderColor: fieldError.no_wa ? "red" : "" }}
                                required
                            />
                            {fieldError.no_wa && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.no_wa}</span>
                            )}
                        </div>
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
                            <label htmlFor="">Kategori <span style={{ color: "red" }}>*</span></label>
                            <select
                                name="category_id"
                                id="category_id"
                                value={form.category_id}
                                onChange={(e) => {
                                    const newID = e.target.value;
                                    const newName = category.find(c => c.id == newID)?.name.toLowerCase();

                                    setForm({
                                        ...form,
                                        category_id: newID,
                                        modul: newName === "ikb" ? form.modul : "",
                                        sub_modul: newName === "ikb" ? form.sub_modul : "",
                                    });

                                    if(newName !== "ikb") {
                                        setFieldError(prev => {
                                            const newErr = { ...prev };
                                            delete newErr.modul;
                                            delete newErr.sub_modul;
                                            return newErr;
                                        });
                                    }
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
                        {isIKB && (
                            <>
                                <div className={Styles['form']}>
                                    <label htmlFor="">Modul <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        name="modul"
                                        id="modul"
                                        placeholder="Masukkan nama modul"
                                        value={form.modul}
                                        onChange={(e) => {
                                            setForm({ ...form, modul: e.target.value });
                                            clearError("modul");
                                        }}
                                        style={{ borderColor: fieldError.modul ? "red" : "" }}
                                        required
                                    />
                                    {fieldError.modul && (
                                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.modul}</span>
                                    )}
                                </div>
                                <div className={Styles['form']}>
                                    <label htmlFor="">Sub Modul <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        name="sub_modul"
                                        id="sub_modul"
                                        placeholder="Masukkan nama sub modul"
                                        value={form.sub_modul}
                                        onChange={(e) => {
                                            setForm({ ...form, sub_modul: e.target.value });
                                            clearError("sub_modul");
                                        }}
                                        style={{ borderColor: fieldError.sub_modul ? "red" : "" }}
                                        required
                                    />
                                    {fieldError.sub_modul && (
                                        <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.sub_modul}</span>
                                    )}
                                </div>
                            </>
                        )}
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