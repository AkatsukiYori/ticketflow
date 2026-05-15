import "dotenv/config";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import cors from "cors";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://ticketflow.com",
    "https://ticketflow.com",
    "http://www.ticketflow.com",
    "https://www.ticketflow.com",
];

const app = Express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: "Content-Type, Authorization"
    }
});

app.use((req: any, _res, next) => {
    req.io = io;
    next();
})

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(Express.json());
app.use("/api", router);
app.use("/uploads", Express.static(path.join(process.cwd(), "uploads")));

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

server.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on port 3000`);
});