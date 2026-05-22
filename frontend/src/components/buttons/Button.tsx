import { Plus, Trash, Pencil, RefreshCcw, Info, Home } from "lucide-react";
import "../../components/buttons/button.css";

type Props = {
    label?: string;
    func?: string;
    onClick?: () => void;
    onClose?: () => void;
    btnTitle?: string;
}

export function Buttons({ label, func, onClick, btnTitle }: Props) {
    const renderIcon = () => {
        switch (func) {
            case "add-desktop":
                return <Plus />;
            case "refresh":
                return <RefreshCcw />;
            case "edit":
                return <Pencil />;
            case "delete":
                return <Trash />;
            case "detail":
                return <Info />;
            case "home":
                return <Home />;
            default:
                return null;
            // case "new-ticket":
            //     return 
        }
    }

    return (
        <button type="button" className={`btn-${func}`} onClick={onClick} title={btnTitle}>{renderIcon()} {label}</button>
    );
}