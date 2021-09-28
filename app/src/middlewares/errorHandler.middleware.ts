import {NextFunction, Request, Response} from 'express'
import {RequestErrorDto} from '../dtos/requestError.dto'
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken'

export default class ErrorHandlerMiddleware {
    static handle(err: Error, req: Request, res: Response, _: NextFunction) {
        let message: string
        let status: number

        console.error(err)

        switch (true) {
            case err instanceof RequestErrorDto:
                status = (err as RequestErrorDto).status
                message = err.message
                break
            case err instanceof JsonWebTokenError:
                status = 400
                message = err.message || 'Error with Auth Token'
                break
            case err instanceof TokenExpiredError:
                // TODO(santiagotoscanini): Implement this.
                break
            default:
                status = 500
                message = 'Unknown Error'
        }
        return res.status(status).json({'message': message})
    }
}
