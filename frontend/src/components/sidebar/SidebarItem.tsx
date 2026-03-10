import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

type SidebarItemProps = {
    icon: LucideIcon,
    label: string,
    to: string
}

export default function SidebarItem({ icon: Icon, label, to }: SidebarItemProps) {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
            <Icon size={20} />
            <span>{label}</span>
        </NavLink>
    );
}