import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import type React from "react";

type SidebarItemProps = {
    icon: LucideIcon;
    label: string;
    to: string;
    onClick?: () => void;
}

export default function SidebarItem({ icon: Icon, label, to, onClick }: SidebarItemProps) {
    const handleClick = (e: React.MouseEvent) => {
        if(onClick) {
            if(to === "#") {
                e.preventDefault();
            }
            onClick();
        }
    };  
    return (
        <NavLink to={to} className={({ isActive }) => (isActive && to !== "#") ? "sidebar-item active" : "sidebar-item"} onClick={handleClick}>
            <Icon size={20} />
            <span>{label}</span>
        </NavLink>
    );
}