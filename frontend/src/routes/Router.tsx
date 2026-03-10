import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminLayouts/Index";
import Dashboard from "../pages/admin/dashboard";
import Ticket from "../pages/admin/ticket";
import Category from "../pages/admin/category";
import Documentation from "../pages/admin/documentation";
import Logs from "../pages/admin/logs";
import Report from "../pages/admin/reports";
import Profile from "../pages/admin/profile";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<Dashboard />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/ticket" element={<Ticket />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/category" element={<Category />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/documentation" element={<Documentation />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/report" element={<Report />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/logs" element={<Logs />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/profile" element={<Profile />}></Route>
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="#" element={<Profile />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}