import "dotenv/config";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import cors from "cors";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const clientUrl = process.env.CLIENT_URL;
const app = Express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: clientUrl,
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
    origin: clientUrl,
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