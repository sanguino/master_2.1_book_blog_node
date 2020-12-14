import {Router} from 'express';
import mongoose from "mongoose";
import Book from '../models/Book.js';
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const ObjectId = mongoose.Types.ObjectId;

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

    routes.get("/books/:id", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Not found!');
        }
        const [book, comments] = await Promise.all([
            Book.findById(req.params.id).exec(),
            Comment.find({bookId: req.params.id}).select({bookId: 0, user: 0}).exec()
        ]);
        if (!book) {
            return res.status(404).send('Not found!');
        }
        const response = book;
        response.comments = comments;
        return res.json(response);
    });

    routes.post("/books/:id/comments", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Not found!');
        }
        const [user, book] = await Promise.all([
            User.findOne({nick: req.body.nick}).exec(),
            Book.exists({_id: req.params.id})
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

        await comment.populate('user');
        return res.json(comment);
    });

    routes.delete("/books/:bookId/comments/:commentId", async (req, res) => {
        if (!ObjectId.isValid(req.params.bookId) || !ObjectId.isValid(req.params.commentId)) {
            return res.status(404).send('Not found!');
        }
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
