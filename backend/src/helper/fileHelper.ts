import { Express } from "express";
import fs from "fs/promises";

export const unlinkFile = async (path: string) => {
    try {
        await fs.unlink(path);
    } catch (error: any) {
        throw new Error(error.message);
    }
}