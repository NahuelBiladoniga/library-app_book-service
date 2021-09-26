import {NextFunction, Request, Response} from 'express'

import db from '../database/setup'
import {RequestErrorDto} from '../middlewares/requestError.dto'
import {LoginServices} from "../services/LoginServices";

class LoginController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const user = await db.User.findByPk(email)
            if (!(user && await user.validPassword(password))) {
                throw new RequestErrorDto('Bad credentials', 400)
            }

            let roles = user.roles
            let token = LoginServices.generateAuthToken(user)

            res.header('auth-token', token).json({email, roles})
        } catch (err) {
            next(err)
        }
    }
}

export default new LoginController()
