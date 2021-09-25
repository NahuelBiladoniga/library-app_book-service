import {NextFunction, Request, Response} from 'express'

import db from '../database/setup'
import {RequestError} from '../middlewares/RequestError'
import {LoginServices} from "../services/LoginServices";

class LoginController {

    public async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body
        const user = await db.User.findByPk(email)
        if (!(user && await user.validPassword(password))) {
            throw new RequestError('bad credentials', 400)
        }

        let roles = user.roles
        let token = LoginServices.generateAuthToken(user)

        res.header('auth-token', token).json({email, roles})
    }
}

export const loginController: LoginController = new LoginController()
