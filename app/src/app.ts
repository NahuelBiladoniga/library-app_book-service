import express, {Application, Request, Response} from 'express'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import LoginRoutes from './routes/login.routes'
import errorHandler from './middlewares/errorHandler'
import {getPort, isProdScope} from "./utils/environment";

export class App {
    private app: Application

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings() {
        this.app.set('port', getPort())
    }

    middlewares() {
        // Instead of this, maybe we can route always to STDOUT.
        if (isProdScope()) {
            const morganLogStream = fs.createWriteStream(path.join(__dirname, '/../morgan.log'), {flags: 'a'})

            this.app.use(morgan('common', {
                skip: (req: Request, res: Response) => {
                    return res.statusCode < 400
                }, stream: morganLogStream
            }))
        } else {
            this.app.use(morgan('dev'))
        }

        this.app.use(express.json())
        this.app.use(errorHandler)
    }

    routes() {
        this.app.use('/login', LoginRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('App start listening on ', this.app.get('port'))
    }
}
