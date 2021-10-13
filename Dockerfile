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

ENV NEW_RELIC_NO_CONFIG_FILE = "true"
ENV NEW_RELIC_APP_NAME = "library-app"
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED = "true"
ENV NEW_RELIC_LOG_LEVEL = "info"
ENV NEW_RELIC_ALLOW_ALL_HEADERS = "true"
ENV NEW_RELIC_ATTRIBUTES_EXCLUDE="['request.headers.cookie','request.headers.authorization','request.headers.proxyAuthorization','request.headers.setCookie*','request.headers.x*','response.headers.cookie','response.headers.authorization','response.headers.proxyAuthorization','response.headers.setCookie*','response.headers.x*']"

COPY --from=builder "/app/build/" "./build"

CMD npm start
