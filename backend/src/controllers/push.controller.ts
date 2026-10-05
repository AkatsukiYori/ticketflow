import { Request, Response } from "express";
import prisma from "../prisma";
import crypto from "crypto";

export const subscribe = async (req: Request, res: Response) => {
    const subscription = req.body;

    const endpointHash = crypto
        .createHash("sha256")
        .update(subscription.endpoint)
        .digest("hex");

    await prisma.pushSubscription.upsert({
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
    })
}