import "dotenv/config";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = Express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
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
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(Express.json());
app.use("/api", router);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

server.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:3000`);
});