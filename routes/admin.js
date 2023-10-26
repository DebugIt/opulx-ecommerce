const express = require("express");
const adminRouter = express.Router()
const isAdmin = require("../middlewares/isAdmin")
const { admin_register, admin_login, admin_verify } = require("../controllers/authController")

// ADMIN REGISTERATIONS AND LOGIN

// ADMIN - REGISTER
adminRouter.post("/register", async(req, res) => {
    const requestBody = req.body
    const response = await admin_register(requestBody);
    const { success, status, message, user } = response;
    if(status === 201){
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    }
    else if(status === 400){
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    } 
    else{
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    }
})
// ADMIN - LOGIN
adminRouter.post("/login", async(req, res) => {
    const reqBody = req.body
    const response = await admin_login(reqBody);
    const { success, status, message, token, error } = response;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else if(status === 403){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else if(status === 404){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else{
        return res.status(status).json({
            success,
            status,
            message,
            error,
            token
        })
    }
})
// ADMIN - VERIFY ADMIN


adminRouter.put("/verifyadmins/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    const { newStatus } = req.body; 
  
    const response = await admin_verify(id, newStatus);
    const { success, status, message } = response;
  
    return res.status(status).json({
      success,
      status,
      message,
    });
  });


module.exports = adminRouter