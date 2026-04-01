import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import Styles from "../../css/layouts/admin/layouts.module.css";
import { useEffect, useState } from "react";
import { ErrorNotification } from "../../components/notifications/notification";

export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const closeSidebar = () => {
        if(window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        const checkExpiredToken = () => {
            const expire = localStorage.getItem("expire");
            if(expire && Date.now() > parseInt(expire)) {
                localStorage.clear();
                ErrorNotification({ message: "Your session has expired. Please login again.", variantType: "info" });
                navigate("/admin-login", { replace: true });
            }
        };
        const interval = setInterval(checkExpiredToken, 30000);

        const handleResize = () => {
            if(window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize), clearInterval(interval)};
    }, [navigate]);
    
    return (
        <section className={Styles['body-section']}>
            <Header toggleSidebar={() => setIsOpen(prev => !prev)} />
            {isOpen && <div className={Styles['overlay']} onClick={closeSidebar}></div>}
            <main className={Styles['main']}>
                <Sidebar isSidebarOpen={isOpen} closeSidebar={closeSidebar} />
                <Outlet />
            </main>
            <Footer />
        </section>
    );
}