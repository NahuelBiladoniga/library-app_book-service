import {NextFunction, Request, Response} from 'express'
import LoginService from "../services/login.service";
import UserService from "../services/user.service";
import {OrganizationService} from "../services/organization.service";

class LoginController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password, organizationName} = req.body

            const user = await UserService.GetUser(email, password, organizationName)

            let roles = user.roles
            let name = user.name
            let authToken = LoginService.generateAuthToken(user)
            let APIToken = await OrganizationService.getAPIToken(organizationName)

            res.header('auth-token', authToken).header('api-token', APIToken).json({email, roles, name})
        } catch (err) {
            next(err)
        }
    }
}

export default new LoginController()
