FROM node:20-alpine

WORKDIR /app

RUN corepack enable

# RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

EXPOSE 8001
EXPOSE 5555

CMD ["pnpm", "dev"]