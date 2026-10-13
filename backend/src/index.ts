import dotenv from "dotenv";
import Express, { Request, Response } from "express";
import router from "./routes/main";
import routerPushNotification from "./routes/push.route";
import cors from "cors";
import http from "http";
import path from "path";
import "./scheduler/index";

dotenv.config();

const allowOrigins = (process.env.ALLOW_ORIGINS ?? "").split(",").map((origin) => origin.trim()).filter(Boolean);
const APP_PORT = process.env.APP_PORT;

const app = Express();
const server = http.createServer(app);

app.use(
    cors({
        origin: (origin, callback) => {
            if(!origin) {
                return callback(null, true);
            }

            if(allowOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin tidak diizinkan oleh CORS."));
        },
        credentials: true,
        allowedHeaders: "Content-Type, Authorization"
    })
);

app.use(Express.json());
app.use("/api-ticketflow", router);
app.use("/api-ticketflow/uploads", Express.static(path.join(process.cwd(), "uploads")));
app.use("/api-ticketflow/push", routerPushNotification);

server.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`);
});
