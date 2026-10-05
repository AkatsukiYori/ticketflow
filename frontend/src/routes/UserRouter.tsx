import { useRoutes } from "react-router-dom";
import HomePage from "../pages/user";
import NewTicket from "../pages/user/newTicket";
import UserLayout from "../layouts/userLayouts/Index";
import CheckTicketStatus from "../pages/user/checkStatus";
import Login from "../pages/user/auth/login";
import ProtectedRouter from "./ProtectedRouter";

export default function UserRouter() {
    const routes = useRoutes([
        {
            path: "/",
            element: <UserLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/tiket-baru", element: <NewTicket /> },
                { path: "/cek-status-tiket", element: <CheckTicketStatus /> },
            ],
        },
        {
            path: "/admin-login",
            element: (
                <ProtectedRouter isAuthPage>
                    <Login />
                </ProtectedRouter>
            )
        }
    ])
    return routes;
}