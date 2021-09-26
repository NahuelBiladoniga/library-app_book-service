import {Router} from 'express'
import {organizationController} from "../controllers/organizationController"
import Authorization from '../middlewares/authorization.middleware'

const router: Router = Router()

router.post('/', Authorization.validateToken, organizationController.inviteToOrganization)

export default router
