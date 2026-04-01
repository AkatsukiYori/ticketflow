import { io } from "socket.io-client";

const socket_url = "http://localhost:3000";

export const socket = io(socket_url, {
    transports: ["websocket"],
    autoConnect: true
});