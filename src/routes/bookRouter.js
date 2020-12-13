import {Router} from 'express';
import {commentToResponse, toResponse} from "../utils/toResponse.js";
import mongoose from "mongoose";
import Book from '../models/Book.js';
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const ObjectId = mongoose.Types.ObjectId;

function getRoutes() {
    const routes = Router();

    routes.get("/books", async (req, res) => {
        const books = await Book.find({}).select('_id title').exec();
        res.json(toResponse(books));
    });

    routes.post("/books", async (req, res) => {
        const book = await new Book(req.body).save();
        res.json(toResponse(book));
    });

    routes.get("/books/:id", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Not found!');
        }
        const [book, comments] = await Promise.all([
            Book.findById(req.params.id).exec(),
            Comment.find({book: {_id: req.params.id}}).select({book: 0, user: 0}).exec()
        ]);
        if (!book) {
            return res.status(404).send('Not found!');
        }
        const response = toResponse(book);
        response.comments = toResponse(comments);
        return res.json(response);
    });

    routes.post("/books/:id/comments", async (req, res) => {
        const user = await User.findOne({nick: req.body.nick}).exec();
        if (!user || !ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Not found!');
        }
        const book = await Book.findById(req.params.id).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        const comment = await new Comment({
            user,
            comment: req.body.comment,
            score: req.body.score,
            book,
        }).save();

        return res.json(commentToResponse(comment, user));
    });

    routes.delete("/books/:bookId/comments/:commentId", async (req, res) => {
        if (!ObjectId.isValid(req.params.bookId) || !ObjectId.isValid(req.params.commentId)) {
            return res.status(404).send('Not found!');
        }
        const [book, comment] = await Promise.all([
            Book.findById(req.params.bookId).exec(),
            Comment.findById(req.params.commentId).exec()
        ]);

        if (!book || !comment) {
            return res.status(404).send('Not found!');
        }
        const user = await User.findById(comment.user).exec();
        comment.delete();
        return res.json(commentToResponse(comment, user));
    });

    return routes;
}

export default getRoutes();
