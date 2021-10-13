import express, {Application} from 'express'

import LoginRoutes from './routes/login.routes'
import UserRoutes from './routes/user.routes'
import OrganizationRoutes from './routes/organization.routes'
import StatusRoutes from './routes/status.routes'
import BookRoutes from './routes/book.routes'
import ErrorHandlerMiddleware from './middlewares/errorHandler.middleware'
import {getPort} from "./utils/environment";
import {Server} from 'http'
import Logger from './logger/implementation.logger'
import {RequestErrorDto} from "./dtos/requestError.dto";

export class App {
    private app: Application
    private server: Server
    private connections: Array<any> = []

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
        // Used before routes to handle exceptions.
        this.app.use(ErrorHandlerMiddleware.handle)
    }

    settings() {
        this.app.set('port', getPort())
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/users', UserRoutes)
        this.app.use('/login', LoginRoutes)
        this.app.use('/organizations', OrganizationRoutes)
        this.app.use('/books', BookRoutes)
        this.app.use('/status', StatusRoutes)
    }

    async listen() {
        this.server = this.app.listen(this.app.get('port'))
        this.handleServerShutdown()
        Logger.info(`Ready to serve requests on port ${this.app.get('port')}`)
    }

    close(done?) {
        this.server.close(done)
    }

    private handleServerShutdown() {
        process.on('SIGTERM', this.shutDown)
        process.on('SIGINT', this.shutDown)

        // Prints the number of open connections on console
        setInterval(() => this.server.getConnections(
            (err, connections) => Logger.info(`${connections} connections currently open`)
        ), 3000)

        this.server.on('connection', connection => {
            this.connections.push(connection)
            connection.on('close', () => this.connections = this.connections.filter(curr => curr !== connection))
        })
    }

    private shutDown() {
        Logger.info('Received kill signal, shutting down gracefully');
        this.server.close(() => {
            Logger.info('Closed out remaining connections');
            process.exit(0);
        });

        setTimeout(() => {
            Logger.error(
                'Could not close connections in time, forcefully shutting down',
                new RequestErrorDto("Error closing connections")
            );
            process.exit(1);
        }, 10000);

        this.connections.forEach(curr => curr.end());
        setTimeout(() => this.connections.forEach(curr => curr.destroy()), 5000);
    }

}
