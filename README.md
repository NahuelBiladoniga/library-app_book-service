Environment variables that need to be set:

* `NODE_ENV`
* `DB_HOST`
* `DB_USER`
* `DB_PASS`
* `DB_SCHEMA`
* `DB_DIALECT`
* `JTW_SECRET_KEY`
* `PORT`

## Migrations

To generate a new migration skeleton run:

```shell
npx sequelize-cli migration:generate --name migration-skeleton --migrations-path ./app/src/database/migrations 
```

To run migrations run:

```shell
npx sequelize-cli db:migrate --url postgres://$USER:$PASSWORD@$URL:$PORT/$DB --migrations-path ./app/src/database/migrations
```

## Seeds

To generate new seed run:

```shell
npx sequelize-cli seed:generate --name demo-user --seeders-path ./app/src/database/seeders
```

To run seeds run:

```shell
npx sequelize-cli db:seed:all --seeders-path ./app/src/database/seeders --url postgres://$USER:$PASSWORD@$URL:$PORT/$DB
```

## Docker

[Link to Image on Docker Hub](https://hub.docker.com/repository/docker/santiagotoscanini/library-app)

To build the image run:

```shell
docker build . -t santiagotoscanini/library-app:$TAG
```

To push the image to Docker Hub run:

```shell
docker push santiagotoscanini/library-app:$TAG
```
