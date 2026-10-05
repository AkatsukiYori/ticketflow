"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = __importDefault(require("./categories"));
const users_1 = __importDefault(require("./users"));
const ticket_1 = __importDefault(require("./ticket"));
const documentation_1 = __importDefault(require("./documentation"));
const auth_1 = __importDefault(require("./auth"));
const logs_1 = __importDefault(require("./logs"));
const members_1 = __importDefault(require("./members"));
const department_1 = __importDefault(require("./department"));
const fileUpload_1 = __importDefault(require("./fileUpload"));
const router = (0, express_1.Router)();
router.use("/categories", categories_1.default);
router.use("/users", users_1.default);
router.use("/tickets", ticket_1.default);
router.use("/documentation", documentation_1.default);
router.use("/auth", auth_1.default);
router.use("/logs", logs_1.default);
router.use("/members", members_1.default);
router.use("/department", department_1.default);
router.use("/upload", fileUpload_1.default);
exports.default = router;
//# sourceMappingURL=main.js.map