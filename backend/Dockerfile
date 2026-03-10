FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# COPY prisma ./prisma
# COPY .env .env
# COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["pnpm", "dev"]