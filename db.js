require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_string + process.env.dbchat_app, error => {
    if (error)
        throw error
    console.log(`server is listning on +=> http://localhost:${process.env.port}/`)
    console.log("connected with mongo server")
})