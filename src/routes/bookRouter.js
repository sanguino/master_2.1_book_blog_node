import {Router} from 'express';
import Book from '../models/Book.js';
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import {isValidObjectId} from "../validators/validators.js"

function getRoutes() {
    const routes = Router();

    routes.get("/books", async (req, res) => {
        const books = await Book.find({}).select('_id title').exec();
        return res.json(books);
    });

    routes.post("/books", async (req, res) => {
        const book = await new Book(req.body).save();
        return res.json(book);
    });

    routes.get("/books/:id", [isValidObjectId('id')], async (req, res) => {
        const book = await Book.findById(req.params.id).populate({
            path: 'comments',
            select: {bookId: 0},
            populate: {path: 'user'}
        }).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        return res.json(book);
    });

    routes.post("/books/:id/comments", [isValidObjectId('id')], async (req, res) => {
        const [user, book] = await Promise.all([
            User.findOne({nick: req.body.nick}),
            Book.findOne({_id: req.params.id})
        ]);

        if (!user || !book) {
            return res.status(404).send('Not found!');
        }
        const comment = await new Comment({
            user,
            comment: req.body.comment,
            score: req.body.score,
            bookId: req.params.id,
        }).save();

        book.comments.push(comment);
        await book.save();

        await comment.populate('user');
        return res.json(comment);
    });

    routes.delete("/books/:bookId/comments/:commentId", [isValidObjectId('bookId')], async (req, res) => {
        const comment = await Comment.findOne({_id: req.params.commentId, bookId: req.params.bookId}).exec();

        if (!comment) {
            return res.status(404).send('Not found!');
        }
        await comment.delete({fields: {bookId: 0}});
        await comment.populate('user');
        return res.json(comment);
    });

    return routes;
}

export default getRoutes();
