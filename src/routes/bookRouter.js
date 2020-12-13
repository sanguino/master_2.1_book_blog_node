import {Router} from 'express';
import Book from '../models/Book.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import toResponse from "../utils/toResponse.js";

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
        const book = await Book.findById(req.params.id).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        return res.json(toResponse(book));
    });

    routes.post("/books/:id/comments", async (req, res, next) => {
        const book = await Book.findById(req.params.id).exec();
        if (!book) {
            return res.status(404).send('Not found!');
        }
        //const comment = await new Comment({}).save();

        return res.json(toResponse(book));
    });

    routes.delete("/books/:bookId/comments/:commentId", async (req, res, next) => {

    });

    return routes;
}

export default getRoutes();
