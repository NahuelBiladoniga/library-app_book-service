import {Router} from 'express'

import RegisterController from '../controllers/register.controller'

const router: Router = Router()

router.post('/', RegisterController.signUp)

export default router
