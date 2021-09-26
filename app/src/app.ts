import express, {Application, Request, Response} from 'express'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import LoginRoutes from './routes/login.routes'
import AdminRoutes from './routes/register.routes'
import InvitationRoutes from './routes/invitations.routes'
import ErrorHandler from './middlewares/errorHandler.middleware'
import {getPort, isProdScope} from "./utils/environment";

export class App {
    private app: Application

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
        // Used before routes to handle exceptions.
        this.app.use(ErrorHandler.handle)
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
        this.app.use('/login', LoginRoutes)
        this.app.use('/register', AdminRoutes)
        this.app.use('/invitations', InvitationRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
    }
}
