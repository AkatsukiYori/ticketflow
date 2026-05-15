import Styles from "../../css/layouts/admin/layouts.module.css";
import logo from "../../assets/logo2.png";
import { List } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    toggleSidebar: () => void;
};

export default function Header({ toggleSidebar } : Props) {
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        const storedLocation = localStorage.getItem("location");
        if(storedName && storedLocation) {
            setUsername(storedName);
            setLocation(storedLocation);
        }
    }, []);

    return (
        <header className={Styles['header']}>
            <section className={Styles['logo']}>
                <img src={logo} alt="Logo" width="200dvw" loading="lazy" />
                <button type="button" className={Styles['btn-sidebar']} onClick={toggleSidebar}><List /></button>
            </section>
            <section className={Styles['section-profile']}>
                <h3 style={{ margin: 0 }}>{ username }</h3>
                <p style={{ margin: 0 }}>{ location.charAt(0).toUpperCase() + location.slice(1) }</p>
            </section>
        </header>
    );
}