import {NextFunction, Request, Response} from 'express'
import {getJWTSecretKey} from "../utils/environment";

const jwt = require('jsonwebtoken')

class AuthorizationMiddleware {
    static JWT_SECRET_KEY: string = getJWTSecretKey()

    private static validateAdminRol(roles: String): Boolean {
        return roles.toLowerCase().includes('admin')
    }

    async validateAdminToken(req: Request, res: Response, next: NextFunction) {
        const authHeader: string | undefined = req.header('auth-token')
        if (authHeader == undefined) {
            return res.status(401).json({'message': 'Missing authentication.'})
        }

        let token = authHeader.replace(/^Bearer\s/, '')

        const decoded = await jwt.verify(token, AuthorizationMiddleware.JWT_SECRET_KEY)

        if (AuthorizationMiddleware.validateAdminRol(decoded['roles'])) {
            next()
        } else {
            return res.status(403).json({'message': 'Missing authorization.'})
        }
    }
}

export default new AuthorizationMiddleware()
