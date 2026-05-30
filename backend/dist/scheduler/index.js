"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const autoCloseTicket_1 = require("./autoCloseTicket");
const autoExpiredTicket_1 = require("./autoExpiredTicket");
node_cron_1.default.schedule("0 0 * * *", async () => {
    await (0, autoExpiredTicket_1.autoExpiredFunction)();
}, {
    timezone: "Asia/Jakarta"
});
node_cron_1.default.schedule("0 0 * * *", async () => {
    await (0, autoCloseTicket_1.autoClosedFunction)();
}, {
    timezone: "Asia/Jakarta"
});
//# sourceMappingURL=index.js.map