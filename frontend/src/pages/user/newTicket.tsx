import { useNavigate } from "react-router-dom";
import "./home.css";
import { createTicket, getTicket } from "../../api/ticketApi";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "../../api/categoryApi";
import { ErrorNotification, SuccessNotification } from "../../components/notifications/notification";

export default function NewTicket() {
    const navigate = useNavigate();
    const dateNow = new Date();
    const [data, setData] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);

    const back = () => {
        navigate("/");
    }

    async function fetchCategory() {
        try {
            const res = await getCategories();
            setCategory(res.data);
        } catch (error) {
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    async function fetchTicket() {
        try {
            const res = await getTicket();
            setData(res.data);
        } catch (error) {
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    useEffect(() => {
        fetchCategory();
        fetchTicket();
    }, []);
    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "category_id" ? Number(value) : value
        }));
    };

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
            const res = await createTicket(form);
            SuccessNotification({ message: `${res.data.message} ${res.data.ticketNo}`, variantType: "success", persist: true });
            setForm({
                ...initialForm,
                category_id: "",
            });
        } catch (error) {
            console.log(error);
            ErrorNotification({ message: "Terjadi kesalahan.", variantType: "error" });
        }
    }

    return (
        <div className="content">
            <section className="content-header" style={{ borderBottom: "1px solid #f1f1f1" }}>
                <h2 style={{ marginBottom: 0 }}>Buat Tiket Baru</h2>
                <p style={{ marginTop: 0 }}>Isikan detail permasalahan yang anda alami.</p>
            </section>
            <form onSubmit={handleSubmit}>
                <section className="content-body">
                    <div className="content-sub-body">
                        <div className="form">
                            <label htmlFor="">Judul Tiket <span style={{ color: "red" }}>*</span></label>
                            <input type="text" name="ticket_title" id="ticket_title" placeholder="Masukkan judul tiket" value={form.ticket_title} onChange={handleChange} required/>
                        </div>
                        <div className="form">
                            <label htmlFor="">Nama Pengguna <span style={{ color: "red" }}>*</span></label>
                            <input type="text" name="user" id="user" placeholder="Masukkan nama pengguna" value={form.user} onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="content-sub-body">
                        <div className="form">
                            <label htmlFor="">Department <span style={{ color: "red" }}>*</span></label>
                            <input type="text" name="department" id="department" placeholder="Masukkan department" value={form.department} onChange={handleChange} required/>
                        </div>
                        <div className="form">
                            <label htmlFor="">Lokasi <span style={{ color: "red" }}>*</span></label>
                            <input type="text" name="location" id="location" placeholder="Masukkan lokasi" value={form.location} onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="content-sub-body">
                        <div className="form">
                            <label htmlFor="">Kategori <span style={{ color: "red" }}>*</span></label>
                            <select name="category_id" id="category_id" value={form.category_id} onChange={handleChange} required>
                                <option value="">-- Pilih Kategori --</option>
                                {category.map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form">
                            <label htmlFor="">Catatan Pengguna (Opsional)</label>
                            <input type="text" name="note" id="note" placeholder="Catatan" value={form.note} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="content-sub-body">
                        <div className="form">
                            <label htmlFor="">Kendala <span style={{ color: "red" }}>*</span></label>
                            <textarea name="problem" id="problem" required placeholder="Jelaskan masalah anda" value={form.problem} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="content-sub-body">
                        <div className="form">
                            <label htmlFor="">Lampiran (Opsional)</label>
                            <input type="file" name="lampiran" id="lampiran" />
                        </div>
                    </div>
                </section>
                <section className="content-footer">
                    <button type="submit" className="btn-submit-ticket">Buat Tiket</button>
                    <button type="button" className="btn-cancel" onClick={back}>Kembali</button>
                </section>
            </form>
        </div>
    );
}