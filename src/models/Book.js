import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const bookSchema = new Schema({
    title: String,
    synopsis: String,
    author: String,
    editorial: String,
    publishedYear: Number,
    comments: [{type: Schema.ObjectId, ref: 'Comment'}]
});

bookSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

const Book = model('Book', bookSchema);


export default Book;