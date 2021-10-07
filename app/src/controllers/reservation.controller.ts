import {NextFunction, Request, Response} from "express";
import ReservationService from "../services/reservation.service";
import {BookService} from "../services/book.service";

export default class ReservationController {
    static async createReservation(req: Request, res: Response, next: NextFunction) {
        try {
            let {reservationDate, organizationName, email} = req.body
            const ISBN = req.params.bookISBN
            reservationDate = new Date(Date.parse(reservationDate))

            await ReservationService.createReservation(reservationDate, ISBN, organizationName, email)

            return res.status(201).json({'message': 'Reservation created.'})
        } catch (err) {
            next(err)
        }
    }

    static async getReservationsOfBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.body.organizationName
            const ISBN = req.params.bookISBN
            const {limit, offset, dateFrom, dateTo} = req.query
            const bookId = await BookService.getBookIdByISBN(ISBN, organizationName)

            const reservations = await ReservationService.getReservationsByBook(
                bookId,
                new Date(<string>dateFrom),
                new Date(<string>dateTo),
                parseInt(<string>limit),
                parseInt(<string>offset),
            )
            res.json(reservations)
        } catch (err) {
            next(err)
        }
    }
}