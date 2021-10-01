import {NextFunction, Request, Response} from 'express'
import {getJWTSecretKey} from "../utils/environment";
import {OrganizationService} from "../services/organization.service";

import {getRole} from "../utils/roles"
import ErrorHandlerMiddleware from "./errorHandler.middleware";

const jwt = require('jsonwebtoken')

export default class TokenMiddleware {
    public static JWT_SECRET_KEY: string = getJWTSecretKey()

    static async loadOrganizationNameFromAuthToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.header('auth-token')
            const authToken = header.replace(/^Bearer\s/, '')
            const authTokenDecoded = await jwt.verify(<string>authToken, TokenMiddleware.JWT_SECRET_KEY)
            const organizationName = authTokenDecoded['organizationName']

            req.body = {...req.body, organizationName}

            next()
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    static async validateOrganizationWithToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header: string | undefined = req.header('auth-token')
            if (header == undefined) {
                res.status(401).json({'message': 'Missing Auth Token'})
            }
            const authToken = header.replace(/^Bearer\s/, '')
            const authTokenDecoded = await jwt.verify(<string>authToken, TokenMiddleware.JWT_SECRET_KEY)
            const organizationName = authTokenDecoded['organizationName']

            if (organizationName === req.params.organizationName) {
                next()
            } else {
                res.status(400).json({'message': 'Invalid token'})
            }
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    static async validateAdminOrUserToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header: string | undefined = req.header('auth-token')
            if (header == undefined) {
                return res.status(401).json({'message': 'Missing Auth Token.'})
            }
            const token = header.replace(/^Bearer\s/, '')
            const decoded = await jwt.verify(<string>token, TokenMiddleware.JWT_SECRET_KEY)

            if (TokenMiddleware.validateAdminRol(decoded['roles']) || TokenMiddleware.validateUserRole(decoded['roles'])) {
                next()
            } else {
                return res.status(403).json({'message': 'Missing authorization.'})
            }
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    static async validateAdminToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header: string | undefined = req.header('auth-token')
            if (header == undefined) {
                return res.status(401).json({'message': 'Missing Auth Token.'})
            }
            const token = header.replace(/^Bearer\s/, '')
            const decoded = await jwt.verify(<string>token, TokenMiddleware.JWT_SECRET_KEY)

            if (TokenMiddleware.validateAdminRol(decoded['roles'])) {
                next()
            } else {
                return res.status(403).json({'message': 'Missing authorization.'})
            }
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    static async validateAPIToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authTokenHeader: string | undefined = req.header('auth-token')
            if (authTokenHeader == undefined) {
                return res.status(401).json({'message': 'Missing Auth Token.'})
            }
            const authToken = authTokenHeader.replace(/^Bearer\s/, '')
            const authTokenDecoded = await jwt.verify(<string>authToken, TokenMiddleware.JWT_SECRET_KEY)
            const organizationName = authTokenDecoded['organizationName']

            const APITokenHeader: string | undefined = req.header('api-token')
            if (APITokenHeader == undefined) {
                return res.status(401).json({'message': 'Missing API Token.'})
            }
            const APIToken = APITokenHeader.replace(/^Bearer\s/, '')

            if (await OrganizationService.isAPITokenValid(organizationName, <string>APIToken)) {
                next()
            } else {
                return res.status(400).json({'message': 'API Token isn\'t valid.'})
            }
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    static async loadDataFromInvitationToken(req: Request, res: Response, next: NextFunction) {
        try {
            const invitationTokenHeader: string | undefined = req.header('invitation-token')
            if (invitationTokenHeader == undefined) {
                return res.status(401).json({'message': 'Missing Invitation Token.'})
            }
            const authTokenDecoded = await jwt.verify(<string>invitationTokenHeader, TokenMiddleware.JWT_SECRET_KEY)
            req.body = {...req.body, ...authTokenDecoded}

            next()
        } catch (err) {
            ErrorHandlerMiddleware.handle(err, req, res, next)
        }
    }

    private static validateAdminRol(roles: string): boolean {
        return roles.toLowerCase().includes(getRole('admin'))
    }

    private static validateUserRole(roles: string): boolean {
        return roles.toLowerCase().includes(getRole('normalUser'))
    }
}
