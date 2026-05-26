import "dotenv/config";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import cors from "cors";
import http from "http";
import path from "path";

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://203.194.113.232:5173"
];

const app = Express();
const server = http.createServer(app);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(Express.json());
app.use("/api-ticketflow", router);
app.use("/api-ticketflow/uploads", Express.static(path.join(process.cwd(), "uploads")));

server.listen(8001, '0.0.0.0', () => {
    console.log(`Server running on port 8001`);
});
