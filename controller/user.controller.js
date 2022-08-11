
const user = require('../model/user.model')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



exports.create = (req, res) => {
    const { firstName, lastName, email, password, mobile, dateOfBirth } = req.body
      user.findOne({ email: email })
        .then(() => {
            res.json({
                status: false,
                message: "you already register please login"
            })
        })
    new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobile: mobile,
        dateOfBirth: dateOfBirth
    })
        .save()
        .then(() => {
            res.status(200).json({
                status: true,
                message: "user registerd"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "following error has been found during registration",
                error: `${error}`
            })
        }
        )
}


exports.get = (req, res) => {
    user
        .find()
        .then(data => {
            res.json({
                status: true,
                message: "Data Retrived...",
                data: data
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "error occured while getting data",
                error: error
            })
        })
}


exports.update = (req, res) => {
    const { firstName, lastName, email, password, mobile, dateOfBirth } = req.body

    user.findOneAndUpdate({ email: req.body.email },
        {
            $set: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobile: mobile,
                dateOfBirth: dateOfBirth
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "profile updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "error while updating profile",
                error
            })
        })
}


exports.deactivate = (req, res) => {
    const { firstName, lastName, email, password, mobile, dateOfBirth } = req.body

    user.findOneAndUpdate({ email: req.body.email },
        {
            $set: {
                __v: 1
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "profile updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "error while updating profile",
                error
            })
        })
}


exports.login = (req, res) => {
    console.log(process.env.TOKEN_SECRET)

    user.findOne({ email: req.body.username })
        .then(data => {
            data.password == req.body.password
                ? res.json({
                    status: true,
                    message: "Logged in"
                })
                : res.json({
                    status: true,
                    message: "incorrect password please try again..."
                })
        })
        .catch(error => {
            res.json({
                status: true,
                message: "account not exist please register..."
            })
        })
}


exports.resetpassword = (req, res) => {
    const { email, oldpassword, newpassword } = req.body

    user.findOne({ email: email })
        .then(data => {
            data.password == newpassword
                ?
                res.json({
                    status: false,
                    message: "old password cannot be same as new password"
                })
                :
                data.password == oldpassword
                    ?
                    user.updateOne({ email: email },
                        {
                            $set: {
                                password: newpassword
                            }
                        })
                        .then(() => {
                            res.json({
                                status: true,
                                message: "password reset successfully"
                            })
                        })
                        .catch(() => {
                            res.json({
                                status: false,
                                message: "old password not match..."
                            })
                        })
                    :
                    res.json({
                        status: false,
                        message: "your old password does not match"
                    })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "email not exist"
            })
        })
}
