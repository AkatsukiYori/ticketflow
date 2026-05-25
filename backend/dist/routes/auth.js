"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../domain/auth/controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const routerAuth = (0, express_1.Router)();
routerAuth.post("/login", authMiddleware_1.LoginMiddleware, controller_1.LoginController);
exports.default = routerAuth;
//# sourceMappingURL=auth.js.map