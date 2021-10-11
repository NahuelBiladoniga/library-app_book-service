FROM node:16-alpine as builder

WORKDIR /app

COPY ["./app/package.json", "./app/package-lock.json", "./"]
RUN npm i --only=dev
RUN npm i --only=prod

COPY ["./app", "./"]

RUN npm run clean
RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY ["./app/package.json", "./app/package-lock.json", "./"]
RUN npm i --only=prod

COPY --from=builder "/app/build/" "./build"

CMD npm start
