FROM node:20.13.0-alpine as results_ms

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build
RUN pnpm prune --prod

EXPOSE 4002

CMD ["pnpm", "start"]
