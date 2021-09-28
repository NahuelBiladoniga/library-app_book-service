import {Router} from 'express'

import UserController from '../controllers/user.controller'
import TokenMiddleware from "../middlewares/token.middleware";

const router: Router = Router()

router.post('/', TokenMiddleware.loadDataFromInvitationToken, UserController.registerFromInvitation)

export default router
