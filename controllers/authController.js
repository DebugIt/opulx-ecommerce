const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// importing models
const User = require('../models/User');
const Admin = require("../models/Admin");
const Users = require("../models/User");


module.exports = {
    register: async (data) => {
        try {
            const { name, email, phone, address, password } = data;
            if(!(name && email && password)){
                return {
                    success: false,
                    status: 400,
                    message: "All Fields Required!",
                    user: null
                }
            }

            const IfExists = await User.findOne({email})
            if(IfExists){
                return {
                    success: false,
                    status: 403,
                    message: "User Already Exists",
                    user: IfExists
                }
            }

            const hashedPass = await bcrypt.hash(password, 10)
            // registering
            const newUser = await new User({
                name,
                email,
                password: hashedPass,
                phone,
                address
            }).save()
            
            return {
                success: true,
                status: 201,
                message: 'Register Successful',
                user: newUser
            }


        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Error in Registering User",
                user: null
            }
        }
    },

    login: async (data) => {
        try {
            const { email, password } = data;
            const IfExists = await User.findOne({email});
            if(!IfExists){
                return {
                    success: false,
                    status: 404,
                    message: "No such User Found",
                    token: null
                }
            }
            const isValidPassword = await bcrypt.compare(password, IfExists.password);
            if(!isValidPassword){
                return {
                    success: false,
                    status: 403,
                    message: "Invalid Credentials",
                    token: null 
                }
            }
            const token = await jwt.sign({_id:IfExists._id}, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })
            return {
                success: true,
                status: 200,
                message: "Logged In Successfully!",
                token,
                id: IfExists._id
            }

        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Error Logging in!",
                token: null,
                error: error
            }
        }
    },

    getuser: async (id) => {
        try {
            const fetchUser = await Users.findById(id)
            if(fetchUser){
                return {
                    success: true,
                    status: 200,
                    message: "User fetched",
                    user: fetchUser
                }
            }else{
                return {
                    success: false,
                    status: 404,
                    message: "No Such User Found!",
                    user: null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                status: 500,
                message: "Internal Server Error",
                user: null
            }
        }
    },

    // ADMIN REGISTERATIONS AND LOGIN

    admin_register: async (data) => {
        try {
            const { name, email, password } = data;
            if(!(name && email && password)){
                return {
                    success: false,
                    status: 400,
                    message: "All Fields Required!",
                    user: null
                }
            }

            const IfExists = await Admin.findOne({email})
            if(IfExists){
                return {
                    success: false,
                    status: 403,
                    message: "Admin Already Exists",
                    user: IfExists
                }
            }

            const hashedPass = await bcrypt.hash(password, 10)
            // registering
            const newUser = await new Admin({
                name,
                email,
                password: hashedPass,
            }).save()
            
            return {
                success: true,
                status: 201,
                message: 'Register Successful',
                user: newUser
            }


        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Error in Registering Admin",
                user: null
            }
        }
    },

    admin_login: async (data) => {
        try {
            const { email, password } = data;
            const IfExists = await Admin.findOne({email});
            if(!IfExists){
                return {
                    success: false,
                    status: 404,
                    message: "No such Admin Found",
                    token: null
                }
            }
            const isValidPassword = await bcrypt.compare(password, IfExists.password);
            if(!isValidPassword){
                return {
                    success: false,
                    status: 403,
                    message: "Invalid Credentials",
                    token: null 
                }
            }
            const token = await jwt.sign({_id:IfExists._id}, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })
            return {
                success: true,
                status: 200,
                message: "Logged In Successfully!",
                token
            }

        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Error Logging in!",
                token: null,
                error: error
            }
        }
    },

    admin_verify: async (id, newStatus) => {
        try {
            const adminFound = await Admin.findById(id);
            if(adminFound){
                const updateStatus = await Admin.updateOne({ _id: id }, { $set: { verificationStatus: newStatus } });
                if(updateStatus){
                    return {
                        success:true,
                        status: 200,
                        message:"Admin Verified successfully!"
                    }
                }else{
                    return {
                        success:false,
                        status: 401,
                        message:"Failed to verify the admin."
                    }
                }
            }
            else{
                return {
                    success:false,
                    status: 404,
                    message:"No such admin found."
                }
            }
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Internal Server Error",
            }
        }
    }
}