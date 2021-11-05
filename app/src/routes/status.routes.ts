import {Router, Request, Response} from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => res.status(204).send())

export default router
