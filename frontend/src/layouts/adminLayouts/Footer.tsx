import { Copyright } from "lucide-react";
import Styles from "../../css/layouts/admin/layouts.module.css";

export default function Footer() {
    return (
        <footer className={Styles['footer']}>
            <small><Copyright size={13}></Copyright> 2026 Ticketflow</small>
        </footer>
    );
}