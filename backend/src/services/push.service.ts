import webpush from "web-push";

webpush.setVapidDetails(
    "mailto:it01.pps@gmail.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
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