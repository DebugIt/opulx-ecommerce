// imports
const express = require("express");
const app = express();
const dotenv = require("dotenv").config()
const cors = require("cors");

// variables
const PORT = process.env.PORT || 4000

// image upload
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");




// use
// file upload .use()
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp/",
//     })
// )

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  

// commons
app.use(cors());
app.use(express.json());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})



// DB connection
require("./DB/connections")

// importing and requiring routes
const userRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const categoryRouter = require("./routes/category");    
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order")


app.use("/api/users", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/category", categoryRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        status: 200,
        message: "Server up and running"
    })
})



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})