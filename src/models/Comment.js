import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const Comment = model('Comment', new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    comment: String,
    score: Number,
    book: {type: Schema.ObjectId, ref: 'Book', required: true}
}));


export default Comment;