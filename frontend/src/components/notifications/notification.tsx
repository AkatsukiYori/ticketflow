import { closeSnackbar, enqueueSnackbar } from "notistack";
import "./notification.css";

type Props = {
    message: string;
    variantType: "default" | "error" | "success" | "warning" | "info";
    persist?: boolean;
}

export function SuccessNotification({ message, variantType, persist }: Props) {
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

export function ErrorNotification({ message, variantType }: Props) {
    enqueueSnackbar(message, {
        variant: variantType,
    });
}

export function InfoNotification({ message, variantType }: Props) {
    enqueueSnackbar(message, {
        variant: variantType,
    });
}

export function WarningNotification({ message, variantType }: Props) {
    enqueueSnackbar(message, {
        variant: variantType,
    });
}