import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Styles from "../../css/layouts/admin/layouts.module.css";
import { useCallback, useEffect, useState } from "react";
import { Notifications } from "../../components/notifications/notification";
import { useApi } from "../../hooks/useApi";

export default function AdminLayout() {
    const { callApi } = useApi();

    const [userData, setUserData] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const closeSidebar = () => {
        if(window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    const fetchUser = useCallback(async (username: string) => {
        try {
            const res = await callApi("get", `/users/get-user/${username}`);
            setUserData(res);
        } catch (error: any) {
            Notifications({ message: "Failed to fetch data.", variantType: "error", persist: false });
        }
    }, [callApi]);

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if(storedName) {
            fetchUser(storedName)
        }
    }, [fetchUser]);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)};
    }, [navigate]);

    return (
        <section className={Styles['body-section']}>
            <Header toggleSidebar={() => setIsOpen(prev => !prev)} />
            {isOpen && <div className={Styles['overlay']} onClick={closeSidebar}></div>}
            <main className={Styles['main']}>
                <Sidebar isSidebarOpen={isOpen} closeSidebar={closeSidebar} user={userData} />
                <Outlet />
            </main>
            <Footer />
        </section>
    );
}