import { closeSnackbar, enqueueSnackbar } from "notistack";
import "./notification.css";

type Props = {
    message: string;
    variantType: "default" | "error" | "success" | "warning" | "info";
    persist: boolean;
}

export function Notifications({ message, variantType, persist }: Props) {
    if(persist) {
        enqueueSnackbar(message, {
            variant: variantType,
            persist: true,
            action: (key) => (
                <button onClick={() => closeSnackbar(key)} className="btn-dismiss-notification">
                    x
                </button>
            )
        });
    } else {
        enqueueSnackbar(message, {
            variant: variantType,
        });
    }
}