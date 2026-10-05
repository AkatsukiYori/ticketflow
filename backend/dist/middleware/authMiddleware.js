"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMiddleware = void 0;
const login_dtos_1 = require("../dtos/auth/login_dtos");
const LoginMiddleware = (req, res, next) => {
    const result = login_dtos_1.LoginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    req.body = result.data;
    next();
};
exports.LoginMiddleware = LoginMiddleware;
//# sourceMappingURL=authMiddleware.js.map