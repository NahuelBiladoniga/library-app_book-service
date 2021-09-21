import {NextFunction, Request, Response} from 'express'

class AdminController {
    public async signUp(req: Request, res: Response, next: NextFunction) {

    }
}

export const adminController: AdminController = new AdminController()
