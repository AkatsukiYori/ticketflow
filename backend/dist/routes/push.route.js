"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const push_controller_1 = require("../controllers/push.controller");
const routerPushNotification = (0, express_1.Router)();
routerPushNotification.post("/subscribe", push_controller_1.subscribe);
exports.default = routerPushNotification;
//# sourceMappingURL=push.route.js.map