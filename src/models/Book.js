import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const Book = model('Book', new Schema({
    title: String,
    synopsis: String,
    author: String,
    editorial: String,
    publishedYear: Number,
    comments:  [{type: Schema.ObjectId, ref: 'Comment'}]
}));


export default Book;