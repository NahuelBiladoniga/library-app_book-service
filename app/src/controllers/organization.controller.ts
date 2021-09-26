import {NextFunction, Request, Response} from 'express'
import OrganizationService from "../services/organization.service"

class OrganizationController {

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

export const organizationController: OrganizationController = new OrganizationController()