import { useNavigate } from "react-router-dom";
import Styles from "../../css/layouts/user/home.module.css";
import { useState } from "react";
import { Notifications } from "../../components/notifications/notification";
import { useApi } from "../../hooks/useApi";
import { SelectOptions } from "../../components/inputs/Input";

import { FileUpload } from "../../components/FileUpload";
import { useQuery } from "@tanstack/react-query";

export default function NewTicket() {
    const { callApi } = useApi();

    const navigate = useNavigate();

    // Validation
    const [fieldError, setFieldError] = useState<{[key: string]: string}>({});
    const [attachment, setAttachment] = useState<{
        id: string,
        filename: string
    } | null>(null);

    const back = () => {
        navigate("/");
    }

    const clearError = (field: string) => {
        setFieldError(prev => ({ ...prev, [field]: "" }));
    };

    const fetchDepartment = async () => {
        return await callApi("get", "/department/get-all-department");
    };

    const fetchMembers = async () => {
        return await callApi("get", "/members/get-all-members");
    };

    const fetchCategory = async () => {
        return await callApi("get", "/categories/get-all-categories");
    };

    const { data: department = [] } = useQuery({
        queryKey: ['department'],
        queryFn: fetchDepartment,
        refetchOnWindowFocus: true,
        staleTime: Infinity
    });

    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
        refetchOnWindowFocus: true,
        staleTime: Infinity
    });

    const { data: category = [] } = useQuery({
        queryKey: ['category'],
        queryFn: fetchCategory,
        refetchOnWindowFocus: true,
        staleTime: Infinity
    });

    const initialForm = {
        ticket_title: "",
        problem: "",
        location: "",
        priority: "",
        note: "",
        status: "pending",
        modul: "",
        sub_modul: "",
        no_wa: "",
        category_id: "",
        department_id: "",
        member_id: "",
        attachment: ""
    };
    const [form, setForm] = useState(initialForm);
    const selectedCategoryName = category.find((c: any) => c.id == form.category_id)?.name.toLowerCase();
    const isIKB = selectedCategoryName === "ikb";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(isIKB) {
            const errors: {[key: string]: string } = {};
            if(!form.modul.trim()) errors.modul = "Modul tidak boleh kosong.";
            if(!form.sub_modul.trim()) errors.sub_modul = "Modul tidak boleh kosong.";

            if(Object.keys(errors).length > 0) {
                setFieldError(errors);
                Notifications({ message: "Mohon isi detail modul dan submodul IKB.", variantType: "info", persist: false });
                return;
            }
        }
        try {
            const payload = {
                ...form,
                department_id: parseInt(form.department_id),
                member_id: parseInt(form.member_id),
                category_id: parseInt(form.category_id),
                modul: isIKB ? form.modul : undefined,
                sub_modul: isIKB ? form.sub_modul : undefined,
                attachment: attachment?.id
            }

            const res = await callApi("post", `/tickets/new-ticket`, payload);
            Notifications({ message: `${res.message} ${res.ticketNo}`, variantType: "success", persist: true });
            setForm(initialForm);
            setFieldError({});
        } catch (error: any) {
            const errorArr = error.response?.data?.error;
            if(Array.isArray(errorArr)) {
                const formattedErrors: { [key: string]: string } = {};
                errorArr.forEach((err: any) => {
                    const fieldName = err.path[0];
                    formattedErrors[fieldName] = err.message;
                });

                setFieldError(formattedErrors);
                Notifications({ message: "Mohon lengkapi data yang wajib diisi.", variantType: "info", persist: false });
                return;
            }
            Notifications({ message: "Terjadi kesalahan.", variantType: "error", persist: false });
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
                            <SelectOptions
                                name="pengguna"
                                id="pengguna"
                                placeholder="Pilih Pengguna"
                                searchAble={true}
                                value={form.member_id}
                                onChangeSelect={(e) => {
                                    setForm({ ...form, member_id: e ? String(e.value) : "" });
                                    clearError("member_id");
                                }}
                                options={members.map((e: any) => (
                                    { label: e.username, value: String(e.id) }
                                ))}
                                style={{ borderColor: fieldError.member_id ? "red" : "" }}
                            />
                            {fieldError.member_id && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.member_id}</span>
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
                                autoComplete="off"
                            />
                            {fieldError.no_wa && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.no_wa}</span>
                            )}
                        </div>
                        <div className={Styles['form']}>
                            <label htmlFor="">Departemen <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                name="department"
                                id="department"
                                placeholder="Pilih Departemen"
                                searchAble={true}
                                value={form.department_id}
                                onChangeSelect={(e) => {
                                    setForm({ ...form, department_id: e ? String(e.value) : "" });
                                    clearError("department_id");
                                }}
                                options={department.map((e: any) => (
                                    { label: e.name, value: String(e.id) }
                                ))}
                                style={{ borderColor: fieldError.member_id ? "red" : "" }}
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
                                autoComplete="off"
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
                                maxLength={20}
                                autoComplete="off"
                            />
                            <small>{form.ticket_title.length}/20</small>
                            {fieldError.ticket_title && (
                                <span style={{ color: "red", fontSize: "12px", marginTop: "-4px" }}>{fieldError.ticket_title}</span>
                            )}
                        </div>
                        <div className={Styles['form']}>
                            <label htmlFor="">Kategori <span style={{ color: "red" }}>*</span></label>
                            <SelectOptions
                                name="kategori"
                                id="kategori"
                                placeholder="Pilih Kategori"
                                searchAble={true}
                                value={form.category_id}
                                onChangeSelect={(e) => {
                                    if(!e) {
                                        setForm({ ...form, category_id: "" })
                                        return;
                                    }

                                    const newID = e.value;
                                    const newName = category.find((c: any) => c.id == newID)?.name?.toLowerCase();

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
                                options={category.map((e: any) => (
                                    { label: e.name, value: String(e.id) }
                                ))}
                                style={{ borderColor: fieldError.member_id ? "red" : "" }}
                            />
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
                                        autoComplete="off"
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
                                        autoComplete="off"
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
                                style={{ borderColor: fieldError.problem ? "red" : "" }}
                                required
                                autoComplete="off"
                                maxLength={1000}
                            ></textarea>
                            <small>{form.problem.length}/1000</small>
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
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className={Styles['content-sub-body']}>
                        <div className={Styles['form']}>
                            <label htmlFor="">Lampiran (Opsional)</label>
                            <FileUpload
                                onUploadSuccess={(file) => setAttachment(file)}
                                onRevert={() => setAttachment(null)}
                                module="tickets"
                                mode="create"
                                document=""
                                fileName={attachment?.filename || ""}
                            />
                        </div>
                    </div>
                </section>
                <section className={Styles['content-footer']}>
                    <button type="submit" className="btn-submit-ticket" title="Buat Tiket">Buat Tiket</button>
                    <button type="button" className="btn-cancel" onClick={back} title="Kembali">Kembali</button>
                </section>
            </form>
        </main>
    );
}