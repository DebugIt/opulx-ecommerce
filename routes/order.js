const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { create, verify_razorpay_order, create_razorpay_order, fetchindividualorder, getall, pending, delivered, cancelled, cancelorder, getParticularOrder, updateorder } = require("../controllers/orderController");
const isAdmin = require("../middlewares/isAdmin");
const isEither = require("../middlewares/isEither");
const dotenv = require("dotenv").config()


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

// create razorpay orders
orderRouter.post('/create-razor-order', isAuthenticated, async (req, res) => {
    const amount = req.body.amount
    const response = await create_razorpay_order(amount);
    const {success, status, message, data, razorpay_order_id } = response
    if(status === 201){
        return res.status(status).json({
            status,
            success,
            message,
            razorpay_order_id,
            data
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            razorpay_order_id,
            data
        })
    }
})


// verify razorpay orders
orderRouter.post('/verify-razor-order', async (req, res) => {
    const rzp_order_id = req.body.razorpay_order_id
    const rzp_pmnt_id = req.body.razorpay_payment_id
    const rzp_sign = req.body.razorpay_signature
    const response = await verify_razorpay_order(rzp_order_id, rzp_pmnt_id, rzp_sign)
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





// getting order by specific user
orderRouter.get("/fetch-individual-order/:id", isEither, async(req, res) => {
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

// update payments
orderRouter.post("/updatepayment/:id", isEither, async(req, res) => {
    let id = req.params.id;
    let paid = req.body.paidstatus
    let tid = req.body.tid
    const response = await updateorder(id, paid, tid);
    const { success, status, message } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message
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

orderRouter.get("/get-particular/:id", isEither, async (req, res) => {
    let id = req.params.id;
    const response = await getParticularOrder(id);
    const { success, status, message, order } = response
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            order
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
            order
        })
    }
})



module.exports = orderRouter