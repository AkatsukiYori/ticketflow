import { io } from "socket.io-client";

const socket_url = import.meta.env.VITE_API_URL;

export const socket = io(socket_url, {
    transports: ["websocket"],
    autoConnect: true
});
