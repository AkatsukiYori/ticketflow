import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: ReactNode,
    isAuthPage?: Boolean
};

export default function ProtectedRouter({ children, isAuthPage = false }: Props) {
    const token = localStorage.getItem("token");

    if(!isAuthPage && !token) {
        return <Navigate to="/admin-login" replace />
    }

    if(isAuthPage && token) {
        return <Navigate to="/admin/dashboard" replace />
    }

    return <>{children}</>
}