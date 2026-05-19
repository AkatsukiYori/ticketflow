import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard";
import Ticket from "../pages/admin/ticket";
import Category from "../pages/admin/category";
import Documentation from "../pages/admin/documentation";
import Logs from "../pages/admin/log";
import Report from "../pages/admin/reports";
import AdminLayout from "../layouts/adminLayouts/Index";
import ProtectedRouter from "./ProtectedRouter";
import Members from "../pages/admin/members/index";

export default function AdminRouter() {
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <ProtectedRouter>
                    <AdminLayout></AdminLayout>
                </ProtectedRouter>
            ),
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "ticket", element: <Ticket /> },
                { path: "category", element: <Category /> },
                { path: "Users", element: <Members /> },
                { path: "documentation", element: <Documentation /> },
                { path: "report", element: <Report /> },
                { path: "logs", element: <Logs /> },
            ],
        },
    ]);
    return routes;
}