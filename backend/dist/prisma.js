"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const client_1 = require("@prisma/client");
// const adapter = new PrismaMariaDb({
//     ssl: false,
//     host: process.env.DB_HOST!,
//     port: Number(process.env.DB_PORT!),
//     user: process.env.DB_USER!,
//     password: process.env.DB_PASSWORD!,
//     database: process.env.DB_NAME!,
// });
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({
    adapter
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map