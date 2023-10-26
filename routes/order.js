const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { create, fetchindividualorder, getall, pending, delivered, cancelled, cancelorder } = require("../controllers/orderController");
const isAdmin = require("../middlewares/isAdmin");
const isEither = require("../middlewares/isEither");

const orderRouter = express.Router()

// creating a order
orderRouter.post("/create-order", isAuthenticated, async(req ,res) => {
    const data = req.body
    const response = await create(data);
    const { success, status, message, order_details } = response
    if(status === 201){
        return res.status(status).json({
            status,
            success,
            message,
            order_details
        })
    }else{
        return res.status(status).json({
            status,
            success,
            message
        })
    }
})

// getting order by specific user
orderRouter.get("/fetch-individual-order/:id", isAuthenticated, async(req, res) => {
    let id = req.params.id;
    const response = await fetchindividualorder(id);
    const { success, status, message, orders } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }else{
        return res.status(status).json({
            status,
            success,
            message
        })
    }
})

// cancel order
orderRouter.put("/cancel-order/:id", isEither, async(req, res) => {
    let id = req.params.id;
    let newstatus = req.body.status
    const response = await cancelorder(id, newstatus);
    const { success, status, message } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message
        })
    }
})

// change order status - admin
orderRouter.put("/update-order-status/:id", isAdmin, async(req, res) => {
    let id = req.params.id;
    let newstatus = req.body.status
    const response = await cancelorder(id, newstatus);
    const { success, status, message } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message
        })
    }
})

// getting all the orders for admin
orderRouter.get("/allorders", isAdmin, async (req, res) => {
    const response = await getall();
    const { success, status, message, orders } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
})

// getting pending, delivered, cancelled orders
orderRouter.get("/get-pending", isAdmin, async (req, res) => {
    const response = await pending();
    const { success, status, message, orders } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
})

orderRouter.get("/get-delivered", isAdmin, async (req, res) => {
    const response = await delivered();
    const { success, status, message, orders } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
})

orderRouter.get("/get-cancelled", isAdmin, async (req, res) => {
    const response = await cancelled();
    const { success, status, message, orders } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            orders
        })
    }
})



module.exports = orderRouter