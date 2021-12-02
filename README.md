**Environment variables that need to be set:**

* `PORT` (Optional, by default uses 80)
* `SENDGRID_API_KEY`
* `NODE_ENV`
* `DB_HOST`
* `DB_USER`
* `DB_PASS`
* `DB_SCHEMA`
* `DB_DIALECT`
* `JTW_SECRET_KEY`
* `PORT`
* `NEW_RELIC_LICENSE_KEY`
* `ORGANIZATION_SERVICE_HOST`
* `RESERVE_SERVICE_HOST`

## Docker

[Link to Image on Docker Hub](https://hub.docker.com/repository/docker/santiagotoscanini/book-service)

To build the image run:

```shell
docker build . -t santiagotoscanini/book-service:$TAG
```

To push the image to Docker Hub run:

```shell
docker push santiagotoscanini/book-service:$TAG
```
To run docker compose:

```shell
docker-compose up
```
