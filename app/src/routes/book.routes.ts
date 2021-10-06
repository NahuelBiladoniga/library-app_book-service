import {Router} from 'express'

import TokenMiddleware from "../middlewares/token.middleware";
import BookController from "../controllers/book.controller";
import ReservationController from "../controllers/reservation.controller";

const router: Router = Router()

router.post(
    '/',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadDataFromAuthToken,
    BookController.createBook,
)
router.put(
    '/:bookISBN',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadDataFromAuthToken,
    BookController.updateBook,
)
router.delete(
    '/:bookISBN',
    TokenMiddleware.validateAdminToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadDataFromAuthToken,
    BookController.deleteBook,
)
router.get(
    '/',
    TokenMiddleware.validateAdminOrUserToken,
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.loadDataFromAuthToken,
    BookController.getBooks
)
router.post(
    '/:bookISBN/reservations',
    TokenMiddleware.validateAPIToken,
    TokenMiddleware.validateAdminOrUserToken,
    TokenMiddleware.loadDataFromAuthToken,
    ReservationController.createReservation,
)

export default router
