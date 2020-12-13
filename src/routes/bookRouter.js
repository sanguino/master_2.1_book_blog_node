import {Router} from 'express';
import {toResponse, commentToResponse} from "../utils/toResponse.js";
import mongoose from "mongoose";
import Book from '../models/Book.js';
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const ObjectId = mongoose.Types.ObjectId;

function getRoutes() {
    const routes = Router();

    routes.get("/books", async (req, res, next) => {
        const books = await Book.find({}).exec();
        res.json(toResponse(books));
    });

    routes.post("/books", async (req, res, next) => {
        const book = await new Book(req.body).save();
        res.json(toResponse(book));
    });

    routes.get("/books/:id", async (req, res, next) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Not found!');
        }
        const book = await Book.findById(req.params.id).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        return res.json(toResponse(book));
    });

    routes.post("/books/:id/comments", async (req, res, next) => {
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

    routes.delete("/books/:bookId/comments/:commentId", async (req, res, next) => {
        if (!ObjectId.isValid(req.params.bookId) || !ObjectId.isValid(req.params.commentId)) {
            return res.status(404).send('Not found!');
        }
        const book = await Book.findById(req.params.bookId).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        const comment = await Comment.findByIdAndDelete(req.params.commentId).exec();
        if (!comment) {
            return res.status(404).send('Not found!');
        }
        const user = await User.findById(comment.user).exec();
        return res.json(commentToResponse(comment, user));
    });

    return routes;
}

export default getRoutes();
