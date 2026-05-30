import cron from "node-cron";
import { autoClosedFunction } from "./autoCloseTicket";
import { autoExpiredFunction } from "./autoExpiredTicket";

cron.schedule("0 0 * * *", async () => {
    await autoExpiredFunction();
}, {
    timezone: "Asia/Jakarta"
});

cron.schedule("0 0 * * *", async () => {
    await autoClosedFunction();
}, {
    timezone: "Asia/Jakarta"
});