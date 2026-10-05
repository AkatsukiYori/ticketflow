"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const crypto_1 = __importDefault(require("crypto"));
const subscribe = async (req, res) => {
    const subscription = req.body;
    const endpointHash = crypto_1.default
        .createHash("sha256")
        .update(subscription.endpoint)
        .digest("hex");
    await prisma_1.default.pushSubscription.upsert({
        where: { endpointHash },
        update: { subscription },
        create: {
            endpoint: subscription.endpoint,
            endpointHash,
            subscription
        },
    });
    res.json({
        success: true
    });
};
exports.subscribe = subscribe;
//# sourceMappingURL=push.controller.js.map