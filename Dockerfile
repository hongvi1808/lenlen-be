
FROM node:23-alpine

ENV NODE_ENV=test
WORKDIR /app

#copy from host to image
COPY ["package.json", "yarn.lock", "./"]
COPY . .

RUN yarn install 
RUN npx prisma generate
RUN yarn build

CMD [ "node"]

