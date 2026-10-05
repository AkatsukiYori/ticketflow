self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting()) ;
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    
    const title = data.title || "Notification";
    const options = {
        body: data.body || "",
        data: data.url || "/"
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(
            event.notification.data?.url || "/"
        )
    );
});