import {NextFunction, Request, Response} from 'express'
import {BookService} from "../services/book.service";

export default class BookController {
    static async getBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.header('organization-name')
            const ISBN = req.params.bookISBN
            const book = await BookService.getBook(ISBN, organizationName)

            await res.json(book).status(200)
        } catch (err) {
            next(err)
        }
    }

    static async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.header('organization-name')
            const {ISBN, title, author, year, imagePath, totalExamples} = req.body
            console.log(organizationName)

            const book = await BookService.createBook(ISBN, title, author, year, organizationName, imagePath, totalExamples)

            await res.json(book).status(200)
        } catch (err) {
            next(err)
        }
    }

    static async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.header('organization-name')
            const {title, author, year, totalExamples, imagePath, isActive} = req.body
            const ISBN = req.params.bookISBN

            const book = await BookService.updateBook(ISBN, organizationName, isActive, title, author, year, totalExamples, imagePath)
            await res.json(book).status(200);
        } catch (err) {
            next(err)
        }
    }

    static async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.header('organization-name')
            const ISBN = req.params.bookISBN

            await BookService.deleteBook(ISBN, organizationName)

            res.status(200).send()
        } catch (err) {
            next(err)
        }
    }

    static async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.header('organization-name')
            const {searchBy, limit, offset} = req.query

            const books = await BookService.getBooksFiltered(
                organizationName,
                <string>searchBy,
                parseInt(<string>limit),
                parseInt(<string>offset),
            )
            res.json({books}).status(200)
        } catch (err) {
            next(err)
        }
    }
}
