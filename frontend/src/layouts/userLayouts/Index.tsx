import Header from "./Header";
import { Outlet } from "react-router-dom";
import Styles from "../../css/layouts/user/layouts.module.css";

export default function UserLayout() {
    return (
        <div className={Styles.main}>
            <Header />
            <Outlet />
        </div>
    );
}