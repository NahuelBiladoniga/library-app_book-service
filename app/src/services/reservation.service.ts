import {Book} from "../database/models/book.model";
import {Reservation} from "../database/models/reservation.model";
import {Op} from "sequelize";
import {RequestErrorDto} from "../dtos/requestError.dto";

export default class ReservationService {
    static async createReservation(reservationDate: Date, ISBN: string, organizationName: string, email: string) {
        // TODO(santiagotoscanini): here we should use transactions, but they are giving trouble with sequelize.
        const book = await Book.findOne({where: {ISBN, organizationName}})
        if (book == undefined) {
            throw new RequestErrorDto("Book not found", 404)
        }
        if(!book.isActive){
            throw new RequestErrorDto("Book not active", 404)
        }
        if (!await ReservationService.enoughBooks(reservationDate, book)) {
            throw new RequestErrorDto("Not enough books", 404)
        }

        console.info("New reservation for book: ", book)
        let endDate = new Date(reservationDate.getTime())
        endDate.setDate(endDate.getDate() + 3)

        const dataToSave = {
            userEmail: email,
            bookId: book.id,
            startDate: reservationDate,
            endDate
        }
        console.info("New reservation to be saved: ", dataToSave)
        await Reservation.create(dataToSave)
    }

    private static async enoughBooks(reservationDate: Date, book: Book): Promise<boolean> {
        let threeDaysBefore = new Date(reservationDate.getTime())
        threeDaysBefore.setDate(reservationDate.getDate() - 3)
        let threeDaysAfter = new Date(reservationDate.getTime())
        threeDaysAfter.setDate(reservationDate.getDate() + 3)
        const amount: number = await Reservation.count({
            where: {
                startDate: {
                    [Op.gte]: threeDaysBefore,
                    [Op.lte]: threeDaysAfter
                },
                bookId: book.id,
            }
        })

        console.info(`Amount of books for ${book.ISBN}: ${amount}`)
        return (book.totalExamples - amount) > 0
    }

    static async areActiveReservationsFromThisDay(date: Date, book){
        let threeDaysBefore = new Date(date.getTime())
        threeDaysBefore.setDate(date.getDate() - 3)
        const amount: number = await Reservation.count({
            where: {
                startDate: {
                    [Op.gte]: threeDaysBefore
                },
                bookId: book.id,
            }
        })

        console.info(`Amount of books for ${book.ISBN}: ${amount}`)
        return amount > 0
    }
}
