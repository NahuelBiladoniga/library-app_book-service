import {NextFunction, Request, Response} from 'express'
import OrganizationService from "../services/organization.service"
import UserService from "../services/user.service";

class OrganizationController {
    public async createOrganization(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, password, organizationName} = req.body

            let APIToken = await OrganizationService.registerOrganization(organizationName)
            let authToken = await UserService.createAdmin(name, email, password, organizationName)

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
            const {email, roles, organizationName} = req.body
            const inviteCode = OrganizationService.generateInviteCode(email, roles, organizationName)
            // TODO(santiagotoscanini): we have to send the information via email.
            res.json({
                email: email,
                roles: roles,
                organization: organizationName,
                inviteCode: inviteCode
            })
        } catch (err) {
            next(err)
        }
    }

    public async overwriteOrganizationToken(req: Request, res: Response, next: NextFunction) {
        const apiToken = req.header("api-token")
        res.json({
            //await OrganizationService.registerOrganization(adminDto.attributes.organization)
        })
    }
}

export default new OrganizationController()