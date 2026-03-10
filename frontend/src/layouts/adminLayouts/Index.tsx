import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", minWidth: "100vw" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Header />

                <main style={{ flex: 1, padding: "20px", backgroundColor: "white", color: "#1b1b1b" }}>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}