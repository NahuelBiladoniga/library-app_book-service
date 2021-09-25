import {Router} from 'express'

import {adminController} from '../controllers/registerController'

const router: Router = Router()

router.post('/', adminController.signUp)

export default router
