import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'

import db from '../database/setup'
import {RequestError} from '../middlewares/RequestError'
import {getJWTSecretKey} from "../utils/environment";

class LoginController {
    private tokenExpirationTime: number = 60 * 60 * 24 // 1 day
    private JsonWebTokenSecretKey: string = getJWTSecretKey()

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body

            const user = await db.User.findByPk(email)
            if (!(user && await user.validPassword(password))) {
                throw new RequestError('bad credentials', 400)
            }

            let roles: string = user.roles
            const token = jwt.sign(
                {email, roles},
                this.JsonWebTokenSecretKey,
                {expiresIn: this.tokenExpirationTime}
            )

            res.header('auth-token', token).json({email, roles})
        } catch (e) {
            next(e)
        }
    }
}

export const loginController: LoginController = new LoginController()
