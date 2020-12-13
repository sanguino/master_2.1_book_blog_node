import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const User = model('User', new Schema({
    nick: {type: String, required: true, unique: true, index: true},
    email: String
}));

export default User;