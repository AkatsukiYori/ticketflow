"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./routes/main"));
const push_route_1 = __importDefault(require("./routes/push.route"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
require("./scheduler/index");
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://203.194.113.232:5173"
];
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(express_1.default.json());
app.use("/api-ticketflow", main_1.default);
app.use("/api-ticketflow/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use("/api-ticketflow/push", push_route_1.default);
server.listen(8001, '0.0.0.0', () => {
    console.log(`Server running on port 8001`);
});
//# sourceMappingURL=index.js.map