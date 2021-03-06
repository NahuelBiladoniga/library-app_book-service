import {NextFunction, Request, Response} from 'express'
import {ValidationError} from "sequelize";
import Logger from "../logger/implementation.logger";

export class RequestErrorDto extends Error {
    public status: number

    constructor(message?: string, status?: number) {
        super(message || 'Unknown Error')
        this.status = status || 500
    }
}

export default class ErrorHandlerMiddleware {
    static handle(err: Error, req: Request, res: Response, _: NextFunction) {
        let message: string
        let status: number

        Logger.error('Error caught', err);

        switch (true) {
            case err instanceof RequestErrorDto:
                status = (err as RequestErrorDto).status
                message = err.message
                break
            case err instanceof ValidationError:
                status = 400
                message = (err as ValidationError).errors[0].message
                break
            default:
                status = 500
                message = 'Unknown Error'
        }
        console.error(message, err)
        return res.status(status).json({'message': message})
    }
}
