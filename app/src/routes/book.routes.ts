import {Router} from 'express'

import BookController from "../controllers/book.controller";

const router: Router = Router()

router.post('/', BookController.createBook)
router.put('/:bookISBN', BookController.updateBook)
router.delete('/:bookISBN', BookController.deleteBook)
router.get('/:bookISBN', BookController.getBook)
router.get('/', BookController.getBooks)

export default router
