import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard";
import Ticket from "../pages/admin/ticket";
import Category from "../pages/admin/category";
import Documentation from "../pages/admin/documentation";
import Logs from "../pages/admin/logs";
import Report from "../pages/admin/reports";
import Profile from "../pages/admin/profile";
import AdminLayout from "../layouts/adminLayouts/Index";

export default function AdminRouter() {
    const routes = useRoutes([
        {
            path: "/",
            element: <AdminLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "ticket", element: <Ticket /> },
                { path: "category", element: <Category /> },
                { path: "documentation", element: <Documentation /> },
                { path: "report", element: <Report /> },
                { path: "logs", element: <Logs /> },
                { path: "profile", element: <Profile /> },
            ],
        },
    ]);
    return routes;
}