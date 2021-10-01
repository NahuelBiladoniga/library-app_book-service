import {NextFunction, Request, Response} from 'express'
import {BookService} from "../services/book.service";

export default class BookController {
    static async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const {ISBN, title, author, year, organizationName, imagePath, numberOfExamples} = req.body

            await BookService.createBook(ISBN, title, author, year, organizationName, imagePath, numberOfExamples)

            res.status(201).json({ISBN, title, author, year})
        } catch (err) {
            next(err)
        }
    }

    static async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, author, year, numberOfExamples, imagePath, isActive, organizationName} = req.body
            const ISBN = req.params.bookISBN

            const book = await BookService.updateBook(ISBN, organizationName, isActive, title, author, year, numberOfExamples, imagePath)
            res.status(200).json(book)
        } catch (err) {
            next(err)
        }
    }

    static async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.body.organizationName
            const ISBN = req.params.bookISBN

            await BookService.deleteBook(ISBN, organizationName)

            res.status(200).send()
        } catch (err) {
            next(err)
        }
    }

    static async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const organizationName = req.body.organizationName
            const {searchBy, limit, offset} = req.query

            const books = await BookService.getBooksFiltered(
                organizationName,
                <string>searchBy,
                parseInt(<string>limit),
                parseInt(<string>offset),
            )
            res.status(200).json(books)
        } catch (err) {
            next(err)
        }
    }
}
