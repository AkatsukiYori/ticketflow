import SidebarItem from "../../components/sidebar/SidebarItem";
import Styles from "../../css/layouts/admin/layouts.module.css";
import { Blocks, LayoutDashboardIcon, Ticket, FileExclamationPointIcon, ChartArea, Logs, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/modals/confirmModal/ConfirmModal";

type Props = {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
    user: any;
};

export default function Sidebar({ isSidebarOpen, closeSidebar, user } : Props) {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/admin-login", { replace: true });
    };

    return (
        <section>
            <aside className={`${Styles['sidebar']} ${isSidebarOpen ? Styles['sidebar-active'] : ""}`}>
                <section className={Styles['sidebar-items']}>
                    {user.role === "admin" ? (
                        <>
                            <SidebarItem icon={LayoutDashboardIcon} label="Dashboard" to="/admin/dashboard" onClick={closeSidebar} />
                            <SidebarItem icon={Ticket} label="Ticket" to="/admin/ticket" onClick={closeSidebar} />
                            <SidebarItem icon={Blocks} label="Category" to="/admin/category" onClick={closeSidebar} />
                            <SidebarItem icon={FileExclamationPointIcon} label="Documentation" to="/admin/documentation" onClick={closeSidebar} />
                            <SidebarItem icon={ChartArea} label="Report & Statistic" to="/admin/report" onClick={closeSidebar} />
                            <SidebarItem icon={Logs} label="Logs" to="/admin/logs" onClick={closeSidebar} />
                        </>
                    ) : (
                        <SidebarItem icon={Ticket} label="Ticket" to="/admin/ticket" onClick={closeSidebar} />
                    )}
                    <SidebarItem icon={LogOut} label="Logout" to="#" onClick={() => setIsLogoutOpen(true)} />
                </section>
    
            </aside>
            <ConfirmModal open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={logout} isTicket={false} message="Are you sure want to logout?" btnCancel="Canecl" btnYes="Logout" label="Are You Sure ?" />
        </section>

    );
}