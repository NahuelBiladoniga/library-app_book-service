FROM node:14.17.0 as builder

WORKDIR /app

COPY ["./package.json", "./package-lock.json", "./"]
RUN npm i --only=dev
RUN npm i --only=prod

COPY ["app", "./"]

RUN npm run clean
RUN npm run build

FROM node:16.9.1-alpine3.11

WORKDIR /app

COPY ["./package.json", "./package-lock.json", "./"]
RUN npm i --only=prod

COPY --from=builder "/app/build/" "./build"

CMD npm start
