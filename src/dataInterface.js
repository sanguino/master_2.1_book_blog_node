import mongoose from 'mongoose';
import Book from './models/Book.js';
import User from './models/User.js';
import Comment from './models/Comment.js';

const mongoUrl = "mongodb://localhost:27017/books_blog";

async function dbConnect() {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    await Book.deleteMany({}).exec();
    await User.deleteMany({}).exec();
    await Comment.deleteMany({}).exec();

}


export default dbConnect;