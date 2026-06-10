"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
const web_push_1 = __importDefault(require("web-push"));
web_push_1.default.setVapidDetails("mailto:it01.pps@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
const sendPushNotification = async (subscription, title, body, url) => {
    await web_push_1.default.sendNotification(subscription, JSON.stringify({
        title,
        body,
        url
    }));
};
exports.sendPushNotification = sendPushNotification;
//# sourceMappingURL=push.service.js.map