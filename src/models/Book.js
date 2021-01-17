import mongoose from 'mongoose';
import {defaultSchemaToJson} from '../validators/validators.js';

const {model, Schema} = mongoose;

const bookSchema = new Schema({
    title: String,
    synopsis: String,
    author: String,
    editorial: String,
    publishedYear: Number,
    comments: [{type: Schema.ObjectId, ref: 'Comment'}]
});

bookSchema.set('toJSON', defaultSchemaToJson);

const Book = model('Book', bookSchema);

export default Book;