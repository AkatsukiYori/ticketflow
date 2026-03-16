import SidebarItem from "../../components/sidebar/SidebarItem";
import "../../components/sidebar/sidebar.css";
import logo from "../../assets/logo2.png";
import { Blocks, LayoutDashboardIcon, Ticket, FileExclamationPointIcon, ChartArea, Logs, UserCircle2, LogOut } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="sidebar" style={{ width: "250px", padding: "20px", background: "#ffffff", color: "#1b1b1b", display: "flex", flexDirection: "column", gap: 16, borderRight: "1px solid #f1f1f1" }}>
            <div>
                <img src={logo} alt="Logo" style={{ width: "180px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SidebarItem icon={LayoutDashboardIcon} label="Dashboard" to="/admin/dashboard" />
                <SidebarItem icon={Ticket} label="Ticket" to="/admin/ticket" />
                <SidebarItem icon={Blocks} label="Category" to="/admin/category" />
                <SidebarItem icon={FileExclamationPointIcon} label="Documentation" to="/admin/documentation" />
                <SidebarItem icon={ChartArea} label="Report & Statistic" to="/admin/report" />
                <SidebarItem icon={Logs} label="Logs" to="/admin/logs" />
                <SidebarItem icon={UserCircle2} label="Profile" to="/admin/profile" />
                <SidebarItem icon={LogOut} label="Logout" to="/admin/logout" />
            </div>
        </div>
    );
}