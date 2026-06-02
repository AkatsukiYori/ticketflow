import cron from "node-cron";
import { autoClosedFunction } from "./autoCloseTicket";
import { autoExpiredFunction } from "./autoExpiredTicket";

cron.schedule("*/2 * * * *", async () => {
    await autoExpiredFunction();
}, {
    timezone: "Asia/Jakarta"
});

cron.schedule("*/2 * * * *", async () => {
    await autoClosedFunction();
}, {
    timezone: "Asia/Jakarta"
});