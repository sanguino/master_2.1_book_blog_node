import mongoose from 'mongoose';
import {defaultSchemaToJson} from '../validators/validators.js';

const {model, Schema} = mongoose;

const userSchema = new Schema({
    nick: {type: String, required: true, unique: true, index: true},
    email: String,
    password: String
});

userSchema.set('toJSON', defaultSchemaToJson);

const User = model('User', userSchema);

export default User;