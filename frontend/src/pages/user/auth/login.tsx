import StylesAuth from "./auth.module.css";
import Banner from "../../../assets/mainImage.webp";
import { InputText } from "../../../components/inputs/Input";
import Logo from "../../../assets/logo.webp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../../../components/notifications/notification";
import { AdminLogin } from "../../../api/authApi";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await AdminLogin(username, password);
            if(response.status === 200) {
                const hours = 2 * 60 * 60 * 1000;
                const expireTime = Date.now() + hours;

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("location", response.data.location);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("expire", expireTime.toString());

                if(username === "ikb" || username === "IKB") {
                    navigate("/admin/ticket");
                } else {
                    navigate("/admin/dashboard");
                }
            } else {
                Notifications({ message: response.message, variantType: "error", persist: false });
            }
        } catch (error) {
            Notifications({ message: "Gagal terhubung ke server.", variantType: "error", persist: false });
        }
    }

    return (
        <main className={StylesAuth['main-content']}>
            <section className={StylesAuth.header}>
                <img src={Logo} alt="Logo" width="60dvh" />
            </section>
            <section className={StylesAuth['section-body']}>
                <section className={StylesAuth['section-hero-banner']}>
                    <img src={Banner} alt="Banner" style={{ width: "100%", height: "auto" }} />
                </section>
                <section className={StylesAuth['section-hero-content']}>
                    <div className={StylesAuth['content-header']}>
                        <h2>Selamat Datang</h2>
                        <p style={{ margin: 0 }}>Silahkan login untuk proses ke dashboard.</p>
                    </div>
                    <form onSubmit={handleLogin} className={StylesAuth['content-body']}>
                        <div className={StylesAuth['form-input']}>
                            <label htmlFor="">Username</label>
                            <InputText type="text" placeholder="Masukkan username" id="username" value={username} onChangeInput={(e) => setUsername(e.target.value)} style={{ width: "100%" }} /> 
                        </div>
                        <div className={StylesAuth['form-input']}>
                            <label htmlFor="">Password</label>
                            <InputText type="password" placeholder="Masukkan password" id="password" value={password} onChangeInput={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
                        </div>
                        <div className={StylesAuth['content-footer']}>
                            <button type="submit">Masuk</button>
                            <a href="/ticketflow/" style={{ textDecoration: "none", color: "#EF4444" }}>Kembali Ke Halaman Utama</a>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
}
