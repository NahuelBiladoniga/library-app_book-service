import express, {Application, Request, Response} from 'express'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import LoginRoutes from './routes/login.routes'
import UserRoutes from './routes/user.routes'
import OrganizationRoutes from './routes/organization.routes'
import StatusRoutes from './routes/status.routes'
import BookRoutes from './routes/book.routes'
import ErrorHandlerMiddleware from './middlewares/errorHandler.middleware'
import {getPort, isProdScope} from "./utils/environment";

export class App {
    private app: Application

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

    logMiddleware() {
        // TODO(santiagotoscanini): Instead of this, maybe we can route always to STDOUT.
        if (isProdScope()) {

            const morganLogStream = fs.createWriteStream(path.join(__dirname, '/../morgan.log'), {flags: 'a'})
            return morgan('common', {
                skip: (req: Request, res: Response) => {
                    return res.statusCode < 400
                }, stream: morganLogStream
            })
        } else {
            return morgan('dev')
        }
    }

    middlewares() {
        this.app.use(this.logMiddleware())
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/sign-up', UserRoutes)
        this.app.use('/login', LoginRoutes)
        this.app.use('/organizations', OrganizationRoutes)
        this.app.use('/books', BookRoutes)
        this.app.use('/status', StatusRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('Ready to serve requests on port', this.app.get('port'))
    }
}
