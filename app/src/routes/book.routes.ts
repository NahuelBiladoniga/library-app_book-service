import {Router} from 'express'

import BookController from "../controllers/book.controller";
import ReservationController from "../controllers/reservation.controller";

const router: Router = Router()

router.post('/', BookController.createBook)
router.put('/:bookISBN', BookController.updateBook)
router.delete('/:bookISBN', BookController.deleteBook)
router.get('/', BookController.getBooks)
router.post('/:bookISBN/reservations', ReservationController.createReservation)
router.get('/:bookISBN/reservations', ReservationController.getReservationsOfBook)
router.get('/most-wanted', BookController.getMostWantedBooks)

export default router
