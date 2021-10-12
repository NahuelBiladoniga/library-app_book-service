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

export class App {
    private app: Application
    private subscribe: Server

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
        this.subscribe = this.app.listen(this.app.get('port'))
        Logger.info(`Ready to serve requests on port ${this.app.get('port')}`)
    }

    close(done?) {
        this.subscribe.close(done)
    }
}
