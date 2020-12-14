import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export function isValidObjectId(id) {
    return (req, res, next) => {
        if (!ObjectId.isValid(req.params[id])) {
            return res.status(404).send('Not found!');
        }
        return next();
    }
}