import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", minWidth: "100vw" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Header />

                <main style={{ flex: 1, backgroundColor: "white", color: "#374151", padding: "0 32px" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}