import {Router} from 'express'
import StatusController from "../controllers/status.controller";

const router: Router = Router()

router.get('/', StatusController.getStatus)

export default router
