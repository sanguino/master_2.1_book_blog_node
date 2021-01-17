import mongoose from 'mongoose';
import {defaultSchemaToJson} from '../helpers/validators.js';

const {model, Schema} = mongoose;

const commentSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    comment: String,
    score: Number,
    bookId: {type: Schema.ObjectId, ref: 'Book', required: true}
});

commentSchema.set('toJSON', defaultSchemaToJson);

const Comment = model('Comment', commentSchema);


export default Comment;