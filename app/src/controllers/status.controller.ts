import {NextFunction, Request, Response} from "express";
import StatusService from "../services/status.service";
import {RequestErrorDto} from "../dtos/requestError.dto";

export default class StatusController {
    static async getStatus(req: Request, res: Response, next: NextFunction) {
        try {
            await StatusService.getServerStatus();
            res.status(204).send()
        } catch (err) {
            next(new RequestErrorDto("External service is down", 504))
        }
    }
}
