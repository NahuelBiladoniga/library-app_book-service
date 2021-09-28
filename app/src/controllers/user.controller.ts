import {NextFunction, Request, Response} from 'express'
import UserService from '../services/user.service'
import {OrganizationService} from "../services/organization.service";

export default class UserController {
    static async registerFromInvitation(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, password, organizationName, roles} = req.body

            const APIToken = await OrganizationService.getAPIToken(organizationName)
            const authToken = await UserService.createUser(name, email, password, organizationName, roles)

            res.header('auth-token', authToken).header('api-token', APIToken).status(201).send()
        } catch (err) {
            next(err)
        }
    }
}
