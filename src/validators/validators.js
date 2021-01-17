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

export const defaultSchemaToJson = {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        if (ret._id) {
            delete ret._id;
        }
        if (ret.password) {
            delete ret.password;
        }
    }
};