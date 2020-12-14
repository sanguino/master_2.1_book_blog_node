import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const userSchema = new Schema({
    nick: {type: String, required: true, unique: true, index: true},
    email: String
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const User = model('User', userSchema);

export default User;