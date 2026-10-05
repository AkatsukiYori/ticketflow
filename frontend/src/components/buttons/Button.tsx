import { Plus, Trash, Pencil, RefreshCcw, Info, Home, CircleCheckBig, CircleX, X, DiscAlbum } from "lucide-react";
import "../../components/buttons/button.css";

type Props = {
    label?: string;
    func?: string;
    onClick?: () => void;
    onClose?: () => void;
    btnTitle?: string;
    style?: React.CSSProperties;
    isDisabled?: boolean;
}

export function Buttons({ label, func, onClick, btnTitle, style, isDisabled }: Props) {
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
            case "register":
                return <CircleCheckBig />;
            case "unregister":
                return <CircleX />;
            case "add-more":
                return <Plus />
            case "remove-desc":
                return <X />
            default:
                return null;
        }
    }

    return (
        <button type="button" className={`btn-${func}`} onClick={onClick} title={btnTitle} style={style} disabled={isDisabled}>{renderIcon()} {label}</button>
    );
}