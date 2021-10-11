import {NextFunction, Request, Response} from 'express'
import OrganizationService from "../services/organization.service"
import UserService from "../services/user.service";
import EmailService from "../email/implementation.email"

class OrganizationController {
    public async createOrganization(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, password, organizationName} = req.body

            // TODO(santiagotoscanini): This should be saved in a in-memory db.
            let APIToken = await OrganizationService.registerOrganization(organizationName)
            let authToken = await UserService.createUser(name, email, password, organizationName, 'admin')

            res.header('auth-token', authToken)
                .header('api-token', APIToken)
                .status(200)
                .json({'role': 'admin'})
        } catch (err) {
            next(err)
        }
    }

    public async inviteToOrganization(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.params.organizationName
            const {email, roles} = req.body
            const inviteCode = await OrganizationService.generateInviteCode(email, roles, organizationName)

            await EmailService.sendEmail(email, organizationName, inviteCode, roles)

            res.status(200).json({email, roles, organizationName, inviteCode})
        } catch (err) {
            next(err)
        }
    }

    public async regenerateAPIToken(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.params.organizationName


            const newAPIToken: string = await OrganizationService.regenerateOrganizationAPIToken(organizationName)

            res.status(204).header('api-token', newAPIToken).send()
        } catch (err) {
            next(err)
        }
    }
}

export default new OrganizationController()
