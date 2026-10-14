import webpush from "web-push";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
    path: path.resolve(__dirname, "../../../.env")
});

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

if(!publicKey || !privateKey) {
    throw new Error("VAPID Key belum terbaca.");
}

webpush.setVapidDetails(
    "mailto:it01.pps@gmail.com",
    publicKey,
    privateKey
);

export const sendPushNotification = async (
    subscription: webpush.PushSubscription,
    title: string,
    body: string,
    url?: string
) => {
    await webpush.sendNotification(
        subscription,
        JSON.stringify({
            title,
            body,
            url
        })
    );
};