import {Router} from 'express'

import OrganizationController from '../controllers/organization.controller'

const router: Router = Router()

router.post('/', OrganizationController.createOrganization)

export default router
