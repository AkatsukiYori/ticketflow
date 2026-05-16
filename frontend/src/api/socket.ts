import { io } from "socket.io-client";

const socket_url = "/api";

export const socket = io(socket_url, {
    transports: ["websocket"],
    autoConnect: true
});
