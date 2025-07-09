
# Stage 1: Build
FROM node:23-alpine AS builder
WORKDIR /app
COPY ["package*.json", "yarn.lock", "tsconfig.json", "tsconfig.build.json", "./"]
ADD src ./src
ADD prisma ./prisma
ADD proto ./proto
ADD firebase ./firebase

# RUN
RUN yarn install && npx prisma generate && yarn build


# Stage 2: Run
FROM node:23-alpine AS runner
WORKDIR /app

COPY package.json tsconfig.json ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/proto ./proto
COPY --from=builder /app/firebase ./firebase

# Khai báo port container
EXPOSE 6379

CMD npx prisma migrate deploy && node dist/src/main.js
