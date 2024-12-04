const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
