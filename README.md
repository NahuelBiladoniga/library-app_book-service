## Descripción del proyecto
Este es el código fuente de un SaaS para gestionar el catálogo y reservas de libros de una biblioteca.

### Alcance funcional del sistema
Las funcionalidades con las que cuesta este sistema hasta el momento son:
* Permite el registro de una Organización junto con un primer usuario Administrador
* Permite al usuario Administrador invitar a otros usuarios Administradores o usuarios normales
* Permite a los usuarios hacer login al sistema para poder acceder a las funcionalidades permitidas según el rol
* El sistema brinda una clave `API-KEY` para poder realizar ciertas funcionalidades relacionadas con las Organizaciones
* Permite a los usuarios Administradores volver a generar la clave `API-KEY` expirando la anterior
* Permite a los usuarios administradores realizar el alta, baja y modificación de libros, siendo la baja un borrado virtual y no permitiendo dar de baja libros con reservas activas
* A los usuarios les permite visualizar el catálogo de libros, el cual utiliza paginación
* Permite a los usuarios hacer una búsqueda por nombre del libro o nombre de autores
* Permite a los usuarios normales realizar reservas de tres días de duración solo para aquellos libros con al menos un ejemplar disponible durante todo el período de reserva
* Permite a los usuarios normales consultar sus reservas activas
* Permite a los usuarios consultar el top 5 de libros más pedidos de la historia
* Permite a los usuarios Administradores consultar dado un libro, una fecha de inicio y una fecha de fin; las reservas de ese libro que entren dentro de ese período de tiempo

### Alcance no funcional del sistema
* Performance: obtener los 5 libros más pedidos y consultar las reservas de un libro en un período de tiempo responde en máximo 300 ms
con cargas de 1200 requests por minuto
* Confiabilidad y disponibilidad: proveemos un endpoint público para consultar el funcionamiento del sistema (validando la disponibilidad de la  base de datos y servicios externos)
* Observabilidad: utilizamos el servicio externo de New Relic para visualizar las peticiones por minuto y los tiempos de respuesta de los endpoints
* Autenticación, autorización y tenancy: mediante el uso de `Auth-Tokens` y `API-KEY`, permitimos hacer validaciones sobre la organización sobre  la cual se quiere realizar la requests y verificamos el rol del usuario para validar si tiene los permisos correspondientes para hacerla
* Seguridad: 
* Integración continua: contamos con tests de las funcionalidades de login y volver a generar el `API-KEY`, a su vez se utilizaron github actions  para correr los tests en los Pull Requests
* Pruebas de carga: se realizaron distintas pruebas de carga para probar los requerimientos de performance
* Identificación de fallas: utilizamos New Relic como servicio de Logs externo, donde se almacenan y centralizan los Logs emitidos
* Portabilidad: el repositorio cuenta con un archivo docker compose que permite levantar el sistema de forma local con todo lo necesario, las variables de entorno que se deben setear se encuentran listadas a continuación

**Environment variables that need to be set:**

* `PORT` (Optional)
* `CACHE_HOST`
* `CACHE_PORT`
* `SENDGRID_API_KEY`
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
npx sequelize-cli migration:generate --name migration --migrations-path ./app/src/database/migrations 
```

To run migrations run:

```shell
npx sequelize-cli db:migrate --url postgres://$USER:$PASSWORD@$URL:$PORT/$DB --migrations-path ./src/database/migrations
```

## Seeds

To generate new seed run:

```shell
npx sequelize-cli seed:generate --name demo-user --seeders-path ./src/database/seeders
```

To run seeds run:

```shell
npx sequelize-cli db:seed:all --seeders-path ./src/database/seeders --url postgres://$USER:$PASSWORD@$URL:$PORT/$DB
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
