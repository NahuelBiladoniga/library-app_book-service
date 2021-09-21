import {Router} from 'express'

import {adminController} from '../controllers/adminController'

const router: Router = Router()

router.post('/', adminController.signUp)

export default router
