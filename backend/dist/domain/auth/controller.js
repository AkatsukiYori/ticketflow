"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const services_1 = require("./services");
const LoginController = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, services_1.LoginServices)(data);
        if (result.status === "error") {
            res.status(500).json({ message: result.message });
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
};
exports.LoginController = LoginController;
//# sourceMappingURL=controller.js.map