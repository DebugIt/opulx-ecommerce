const Order = require("../models/Order")
const Users = require("../models/User")

module.exports = {
    create: async (data) => {
        try {
            const { user, products, totalPrice, status, address } = data
            // calculating the total amount of the Products
            let totalamount = 0
            for(let i=0;i<products.length;i++){
                totalamount += products[i].price * products[i].quantity
            }
            
            // creating thr order
            const newOrder = await Order.create({user, products, totalPrice:totalamount, status, address})
            if(newOrder){
                return {
                    status: 201,
                    success: true,
                    message: "New Order Created Successfully",
                    order_details: newOrder
                }
            }else{
                return {
                    status: 500,
                    success: false,
                    message: "Failed to Create New Order",
                    order_details: null
                }
            }

        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    fetchindividualorder: async (id) => {
        try {
            const findUser = await Users.findById(id);
            if(!findUser){
                return {
                    status:404,
                    success:false,
                    message:"No User Found"
                }
            }else{
                const fetchOrders = await Order.find({user:id})
                if(fetchOrders){
                    return {
                        status: 200,
                        success:true,
                        message: "Orders fetcheds",
                        orders: fetchOrders
                    }
                }else{
                    return {
                        status: 404,
                        success: false,
                        message: "No Orders found for this user",
                        orders: null
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    getall: async () => {
        try {
            const getAllOrders = await Order.find();
            if(getAllOrders){
                return {
                    status: 200,
                    success: true,
                    message: "All Orders Fetched",
                    orders: getAllOrders
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Orders found",
                    orders: null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    pending: async () => {
        try {
            const getAllOrders = await Order.find({status:"pending"});
            if(getAllOrders){
                return {
                    status: 200,
                    success: true,
                    message: "All Orders Fetched",
                    orders: getAllOrders
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Orders found",
                    orders: null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    delivered: async () => {
        try {
            const getAllOrders = await Order.find({status:"delivered"});
            if(getAllOrders){
                return {
                    status: 200,
                    success: true,
                    message: "All Orders Fetched",
                    orders: getAllOrders
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Orders found",
                    orders: null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    cancelled: async () => {
        try {
            const getAllOrders = await Order.find({status:"cancelled"});
            if(getAllOrders){
                return {
                    status: 200,
                    success: true,
                    message: "All Orders Fetched",
                    orders: getAllOrders
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Orders found",
                    orders: null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }
        }
    },

    cancelorder: async (id, newstatus) => {
        try {
            const findOrder = await Order.findByIdAndUpdate(id, {status: newstatus}, {new:true})
            if(findOrder){
                return {
                    status: 200,
                    success: true,
                    message: `Order ${findOrder._id} has been updated to ${newstatus}`
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "Order not Found"
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }           
        }
    },

    changeorderstatus: async (id, newstatus) => {
        try {
            const findOrder = await Order.findByIdAndUpdate(id, {status: newstatus}, {new:true})
            if(findOrder){
                return {
                    status: 200,
                    success: true,
                    message: `Order ${findOrder._id} has been updated to ${newstatus}`
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "Order not Found"
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                sucess: false,
                message: error.message || 'Internal Server Error'
            }         
        }
    }
}