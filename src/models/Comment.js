import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const commentSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    comment: String,
    score: Number,
    bookId: {type: Schema.ObjectId, ref: 'Book', required: true}
});

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

const Comment = model('Comment', commentSchema);


export default Comment;