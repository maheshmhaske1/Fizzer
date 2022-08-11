require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mahesh:mahi3332@cluster0.kjb1q.mongodb.net/trio?retryWrites=true&w=majority', error => {
    if (error)
        throw error
    console.log(`server is listning on +=> http://localhost:${process.env.port}/`)
    console.log("connected with mongo server")
})
