import { Copyright } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{ height: "40px", borderTop: "1px solid #f1f1f1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", color: "#1b1b1b" }}>
            <small><Copyright size={13}></Copyright> 2026 Ticketflow</small>
        </footer>
    );
}