const express = require("express");
const bannerRouter = express.Router();
const { getforhome, addBanner, getall, getforcategory, deletebanner } = require("../controllers/bannerController");
const isAdmin = require("../middlewares/isAdmin");


bannerRouter.get("/getallbanners", isAdmin, async (req, res) => {
    const response = await getall();
    const { success, status, message, banners } = response
    if(status === 200){
        return res.status(status).json({
            success, 
            status,
            message,
            banners
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message,
            banners
        })
    }
})

bannerRouter.get("/getbanner_home", async (req, res) => {
    const response = await getforhome();
    const { success, status, message, banners } = response
    if(status === 200){
        return res.status(status).json({
            success, 
            status,
            message,
            banners
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message,
            banners
        })
    }
})

bannerRouter.get("/getbanner_category", async (req, res) => {
    const response = await getforcategory();
    const { success, status, message, banners } = response
    if(status === 200){
        return res.status(status).json({
            success, 
            status,
            message,
            banners
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message,
            banners
        })
    }
})

bannerRouter.post("/addbanner", isAdmin, async (req, res) => {
    const data = {
        position: req.body.position,
        title: req.body.title,
        imageUrl: req.body.url
    }
    const response = await addBanner(data);
    const { success, status, message, banner } = response
    if(status === 201){
        return res.status(status).json({
            success, 
            status,
            message,
            banner
        })
    }
    else{
        return res.status(status).json({
            success,
            status,
            message,
            banner
        })
    }
})

bannerRouter.delete("/removebanner/:id", isAdmin, async (req, res) => {
    const bannerid = req.params.id
    const response = await deletebanner(bannerid);
    const { success, status, message } = response
    if(status === 200){
        return res.status(status).json({
            success, 
            status,
            message
        })
    }
    else{
        return res.status(status).json({
            success,
            status,
            message
        })
    }
})

module.exports = bannerRouter