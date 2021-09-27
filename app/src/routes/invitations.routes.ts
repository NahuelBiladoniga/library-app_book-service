import {Router} from 'express'
import OrganizationController from "../controllers/organization.controller"
import Authorization from '../middlewares/authorization.middleware'

const router: Router = Router()

router.post('/', Authorization.validateAdminToken, OrganizationController.inviteToOrganization)

export default router
