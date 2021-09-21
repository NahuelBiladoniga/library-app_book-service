import {NextFunction, Request, Response} from 'express'
import {sign} from 'jsonwebtoken'

import db from '../database/setup'
import {RequestError} from '../middlewares/RequestError'
import {getJWTSecretKey} from "../utils/environment";

class LoginController {
    static JWT_EXPIRATION_TIME = 60 * 60 * 24 // 1 day
    static JWT_SECRET_KEY: string = getJWTSecretKey()

    public async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body
        const user = await db.User.findByPk(email)
        if (!(user && await user.validPassword(password))) {
            throw new RequestError('bad credentials', 400)
        }

        let roles: string = user.roles
        const token = sign(
            {email, roles},
            LoginController.JWT_SECRET_KEY,
            {expiresIn: LoginController.JWT_EXPIRATION_TIME}
        )

        res.header('auth-token', token).json({email, roles})
    }
}

export const loginController: LoginController = new LoginController()
