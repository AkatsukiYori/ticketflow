import axios from "axios";
import { urlBase64toUint8Arrray } from "../utils/vapid";

export const subscribePush = async () => {
    const permission = await Notification.requestPermission();

    if(permission != "granted") {
        return;
    }
    
    const registration = await navigator.serviceWorker.ready;

    const existing = await registration.pushManager.getSubscription();

    const subscription = existing || await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64toUint8Arrray(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    });

    const payload = subscription.toJSON();
    await axios.post(`${import.meta.env.VITE_API_URL}/push/subscribe`, payload);

    return subscription;
}