import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
    children: ReactNode
};

export default function ProtectedRouter({ children }: Props) {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/admin-login" replace />
    }

    return <>{children}</>
}