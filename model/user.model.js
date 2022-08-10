const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required field']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required field']
    },
    email: {
        type: String,
        required: [true, 'email is required field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required field']
    },
    mobile: {
        type: Number,
        required: [true, 'mobile number is required field'],
        unique: true
    },
    dateOfBirth: {
        type: String,
        required: [true, 'date of birth is required field']
    }
})

const users = mongoose.model("user", UserSchema)
module.exports = users