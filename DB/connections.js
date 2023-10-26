const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection to DB success!")
}).catch((err) => {
    console.log(err);
})