import {Router} from 'express';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import {createToken} from '../validators/token.js';
import bcrypt from 'bcryptjs';

function getRoutes() {
  const routes = Router();

  routes.post('/login', async (req, res) => {

    const user = await User.findOne({nick: req.body.nick}).exec();
    if (!user) return res.status(404).send('No user found.');

    console.log(req.body.password, user.password);
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

    const token = createToken({id: user._id});
    res.status(200).send({auth: true, token: token});
  });

  routes.post("/users", async (req, res) => {
    try {
      const password = bcrypt.hashSync(req.body.password, 8);
      const user = await new User({...req.body, password}).save();
      res.json(user);
    } catch (err) {
      return res.status(409).send('User exists');
    }
  });

  routes.get("/users/:nick", async (req, res) => {
    const user = await User.findOne({nick: req.params.nick}).exec();
    if (!user) {
      return res.status(404).send('Not found!');
    }
    return res.json(user);
  });

  routes.get("/users/:nick/comments", async (req, res) => {
    const user = await User.findOne({nick: req.params.nick}).exec();
    if (!user) {
      return res.status(404).send('Not found!');
    }
    const comments = await Comment.find({user}).select({user: 0}).exec();
    return res.json(comments);
  });

  routes.patch("/users/:nick", async (req, res) => {
    const user = await User.findOneAndUpdate(
      {nick: req.params.nick},
      {email: req.body.email},
      {new: true}
    ).exec();
    if (!user) {
      return res.status(404).send('Not found!');
    }
    return res.json(user);
  });

  routes.delete("/users/:nick", async (req, res) => {
    const user = await User.findOne({nick: req.params.nick}).exec();
    if (!user) {
      return res.status(404).send('Not found!');
    }
    const numComments = await Comment.countDocuments({user}).exec();
    if (numComments !== 0) {
      return res.status(409).send('User has comments');
    }
    user.delete();
    return res.json(user);
  });

  return routes;
}

export default getRoutes();
