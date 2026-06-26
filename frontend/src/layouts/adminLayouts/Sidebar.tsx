import SidebarItem from "../../components/sidebar/SidebarItem";
import Styles from "../../css/layouts/admin/layouts.module.css";
import { Blocks, LayoutDashboardIcon, Ticket, FileExclamationPointIcon, ChartArea, Logs, LogOut, Users2, TicketsIcon } from "lucide-react";
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

    const sideBarMenus = {
        admin: [
            { icon: LayoutDashboardIcon, label: 'Dashboard', to: '/admin/dashboard' },
            { icon: Ticket, label: 'Ticket', to: '/admin/ticket' },
            { icon: TicketsIcon, label: 'IKB', to: '/admin/ticket-ikb' },
            { icon: Blocks, label: 'Category', to: '/admin/category' },
            { icon: Users2, label: 'Users', to: '/admin/users' },
            { icon: FileExclamationPointIcon, label: 'Documentation', to: '/admin/documentation' },
            { icon: ChartArea, label: 'Report & Statistic', to: '/admin/report' },
            { icon: Logs, label: 'Logs', to: '/admin/logs' },
        ],
        ga: [
            { icon: LayoutDashboardIcon, label: 'Dashboard', to: '/admin/dashboard' },
            { icon: Ticket, label: 'Ticket', to: '/admin/ticket' },
        ],
        ikb: [
            { icon: TicketsIcon, label: 'IKB', to: '/admin/ticket-ikb' },
        ]
    };

    return (
        <section>
            <aside className={`${Styles['sidebar']} ${isSidebarOpen ? Styles['sidebar-active'] : ""}`}>
                <section className={Styles['sidebar-items']}>
                    {sideBarMenus[user.role as keyof typeof sideBarMenus]?.map((menu: any) => (
                        <SidebarItem
                            key={menu.to}
                            icon={menu.icon}
                            label={menu.label}
                            to={menu.to}
                            onClick={closeSidebar}
                        />
                    ))}
                    <SidebarItem icon={LogOut} label="Logout" to="#" onClick={() => setIsLogoutOpen(true)} />
                </section>
    
            </aside>
            <ConfirmModal open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={logout} isTicket={false} message="Are you sure want to logout?" btnCancel="Canecl" btnYes="Logout" label="Are You Sure ?" />
        </section>
    );
}