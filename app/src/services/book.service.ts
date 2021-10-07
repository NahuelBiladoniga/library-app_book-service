import {Book} from "../database/models/book.model";
import {RequestErrorDto} from "../dtos/requestError.dto";
import {Op} from "sequelize";
import ReservationService from "./reservation.service";
import sequelize from "../database/setup"

export class BookService {
    public static async createBook(
        ISBN: string,
        title: string,
        author: string,
        year: number,
        organizationName: string,
        imagePath: string,
        totalExamples: number,
    ) {
        if (await this.isBookRegistered(ISBN, organizationName)) {
            throw new RequestErrorDto(`Book with ISBN: '${ISBN}' is already registered.`)
        }
        await Book.create({ISBN, title, author, year, organizationName, imagePath, totalExamples})
    }

    public static async deleteBook(ISBN: string, organizationName: string) {
        if (!await this.isBookRegistered(ISBN, organizationName)) {
            throw new RequestErrorDto(`Book with ISBN: '${ISBN}' isn't registered.`)
        }
        await BookService.updateBook(ISBN, organizationName, false)
    }

    public static async updateBook(
        ISBN: string,
        organizationName: string,
        isActive?: boolean,
        title?: string,
        author?: string,
        year?: number,
        totalExamples?: number,
        imagePath?: string,
    ) {
        const book = await Book.findOne({where: {ISBN, organizationName}})
        if (book == null) {
            throw new RequestErrorDto(`Book with ISBN: '${ISBN}' isn't registered.`)
        }

        if ((!isActive || totalExamples < book.totalExamples) && await ReservationService.areActiveReservationsFromThisDay(new Date(), book)) {
            throw new RequestErrorDto("Cannot reduce the number of examples or deactivate the book while there are active reservations");
        }
        const dataToUpdate = {isActive, title, author, year, totalExamples, imagePath}
        Object.keys(dataToUpdate).forEach(k => dataToUpdate[k] == null && delete dataToUpdate[k]);

        return await book.update(dataToUpdate)
    }

    static async getBooksFiltered(organizationName: string, searchBy: string, limit: number, offset: number) {
        console.log(organizationName, searchBy, limit, offset)
        return await Book.findAll({
                where: {
                    [Op.or]: [
                        {title: {[Op.iLike]: `%${searchBy}%`}},
                        {author: {[Op.iLike]: `%${searchBy}%`}},
                    ],
                    organizationName,
                },
                limit,
                offset,
            }
        )
    }

    static async getBookIdByISBN(ISBN: string, organizationName: string): Promise<number> {
        const book = await Book.findOne({where: {ISBN, organizationName}})
        if (book == undefined) {
            throw new RequestErrorDto("Book doesn't exist", 404)
        }
        return book.id
    }

    static async isBookRegistered(ISBN: string, organizationName: string): Promise<boolean> {
        const book = await Book.findOne({where: {ISBN, organizationName}})
        return book != null
    }

    static async getMostWantedBooks(organizationName: string, countOfBooks: number) {
        return await sequelize.query(`
                    select "amount"::INTEGER, "ISBN",
                           "isActive",
                           "title",
                           "author",
                           "year",
                           "totalExamples",
                           "imagePath"
                    from (
                             SELECT "bookId", count(1) as amount
                             FROM "Reservations"
                             where "organizationName" = '${organizationName}'
                             group by "bookId"
                             order by count(1) desc
                                 limit ${countOfBooks}
                         ) as most_wanted
                             inner join "Books" as "books" on "id" = most_wanted."bookId";
            `, {
                model: Book,
                mapToModel: true
            }
        )
    }
}