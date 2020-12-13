import {Router} from 'express';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import toResponse from "../utils/toResponse.js";

function getRoutes() {
    const routes = Router();

    routes.post("/users", async (req, res, next) => {
        try {
            const user = await new User(req.body).save();
            res.json(toResponse(user));
        } catch (err) {
            return res.status(409).send('User exists');
        }
    });

    routes.get("/users/:nick", async (req, res, next) => {
        const user = await User.findOne({nick: req.params.nick}).exec();
        if (!user) {
            return res.status(404).send('Not found!');
        }
        return res.json(toResponse(user));
    });

    routes.get("/users/:nick/comments", async (req, res, next) => {

    });

    routes.patch("/users/:nick", async (req, res, next) => {
        const user = await User.findOneAndUpdate(
            {nick: req.params.nick},
            {email:req.body.email},
            {new: true}
            ).exec();
        if (!user) {
            return res.status(404).send('Not found!');
        }
        return res.json(toResponse(user));
    });

    routes.delete("/users/:nick", async (req, res, next) => {
        const user = await User.findOneAndDelete({nick: req.params.nick}).exec();
        if (!user) {
            return res.status(404).send('Not found!');
        }
        return res.json(toResponse(user));
    });

    return routes;
}

export default getRoutes();
