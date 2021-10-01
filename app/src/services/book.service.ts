import {Book} from "../database/models/book.model";
import {RequestErrorDto} from "../dtos/requestError.dto";
import {Op} from "sequelize";

export class BookService {
    public static async createBook(
        ISBN: string,
        title: string,
        author: string,
        year: number,
        organizationName: string,
        imagePath: string,
        numberOfExamples: number,
    ) {
        if (await this.isBookRegistered(ISBN, organizationName)) {
            throw new RequestErrorDto(`Book with ISBN: '${ISBN}' is already registered.`)
        }
        await Book.create({ISBN, title, author, year, organizationName, imagePath, numberOfExamples})
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
        numberOfExamples?: number,
        imagePath?: string,
    ) {
        if (!await this.isBookRegistered(ISBN, organizationName)) {
            throw new RequestErrorDto(`Book with ISBN: '${ISBN}' isn't registered.`)
        }

        if (!isActive) {
            // TODO(santiagotoscanini): In this case, we should check for active reservations.
        }
        const dataToUpdate = {isActive, title, author, year, numberOfExamples, imagePath}
        Object.keys(dataToUpdate).forEach(k => dataToUpdate[k] == null && delete dataToUpdate[k]);

        const book = await Book.findOne({where: {ISBN, organizationName}})
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

    static async isBookRegistered(ISBN: string, organizationName: string): Promise<boolean> {
        const book = await Book.findOne({where: {ISBN, organizationName}})
        return book != null
    }
}