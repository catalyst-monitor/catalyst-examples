FROM node:18-bookworm AS builder

WORKDIR /app

COPY package.json .eslintrc.cjs .eslintignore tsconfig.json vite.config.ts svelte.config.js yarn.lock .env.production ./
RUN yarn install

COPY src/ src/
COPY static/ static/

RUN yarn build

FROM node:18-bookworm AS runner

WORKDIR /app

COPY --from=builder /app/build/ build/
COPY --from=builder /app/node_modules/ node_modules/
COPY --from=builder /app/package.json /app/.env.production .

EXPOSE 3000:3000

CMD ["node", "-r", "dotenv/config", "build"]