import { io } from "socket.io-client";

const socket_url = import.meta.env.VITE_API_URL.replace("/api", "");

export const socket = io(socket_url, {
    autoConnect: true,
    transports: ["websocket", "polling"]
});
