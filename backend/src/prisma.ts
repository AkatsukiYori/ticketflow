import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

// const adapter = new PrismaMariaDb({
//     ssl: false,
//     host: process.env.DB_HOST!,
//     port: Number(process.env.DB_PORT!),
//     user: process.env.DB_USER!,
//     password: process.env.DB_PASSWORD!,
//     database: process.env.DB_NAME!,
// });

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter
});

export default prisma;