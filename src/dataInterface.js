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


  await new Book({
    title: "El Hobbit",
    synopsis: "un buen libro",
    author: "J. R. R. Tolkien",
    editorial: "George Allen & Unwin",
    publishedYear: 1937
  }).save();

  await new User({
    nick: "testDeleteUser",
    email: "testDeleteUser@gmail.com"
  }).save();

}


export default dbConnect;