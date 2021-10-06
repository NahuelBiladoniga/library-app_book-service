import {NextFunction, Request, Response} from "express";
import ReservationService from "../services/reservation.service";

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
}