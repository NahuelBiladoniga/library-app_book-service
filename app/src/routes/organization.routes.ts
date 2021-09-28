import {Router} from 'express'

import OrganizationController from '../controllers/organization.controller'
import TokenMiddleware from "../middlewares/token.middleware";

const router: Router = Router()

router.post('/', OrganizationController.createOrganization)
router.post(
    '/:organizationName/invitations',
    TokenMiddleware.validateOrganizationWithToken,
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    OrganizationController.inviteToOrganization
)

export default router
