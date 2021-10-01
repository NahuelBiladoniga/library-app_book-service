import {Router} from 'express'

import TokenMiddleware from "../middlewares/token.middleware";
import BookController from "../controllers/book.controller";

const router: Router = Router()

router.post(
    '/',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadOrganizationNameFromAuthToken,
    BookController.createBook,
)
router.put(
    '/:bookISBN',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadOrganizationNameFromAuthToken,
    BookController.updateBook,
)
router.delete(
    '/:bookISBN',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadOrganizationNameFromAuthToken,
    BookController.deleteBook,
)
router.get(
    '/',
    TokenMiddleware.validateAdminOrUserToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadOrganizationNameFromAuthToken,
    BookController.getBooks
)

export default router
