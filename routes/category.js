const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const isEither = require("../middlewares/isEither");
const categoryRouter = express.Router()
const { create, update, getAll, getindividual, deletecategory, fetchcategoryproducts } = require("../controllers/categoryController")


categoryRouter.post("/create-category",isAdmin, async(req, res) => {
    const { name } = req.body
    const response = await create(name);
    const { success, status, message, data } = response
    if(status === 201){
        return res.status(status).json({
            status,
            success,
            message,
            data
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
        })
    }
})

categoryRouter.put("/update-category/:id", isAdmin, async(req, res) => {
    const { newName } = req.body;
    const catId = req.params.id;
    const response = await update(catId, newName);
    const { success, status, message, data } = response;
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            data
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
        })
    }
})

categoryRouter.get("/getall-categories", async(req ,res) => {
    const response = await getAll();
    const { success, status, message, data } = response;
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            data
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
        })
    }
})

categoryRouter.get("/get-individualcategory/:slug", async(req, res) => {
    const slug = req.params.slug
    const response = await getindividual(slug);
    const { success, status, message, data } = response;
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            data
        })
    }
    else{
        return res.status(status).json({
            status,
            success,
            message,
        })
    }
})

categoryRouter.delete("/delete-category/:id", isAdmin, async(req, res) => {
    const id = req.params.id
    const response = await deletecategory(id);
    const { success, status, message } = response;
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

categoryRouter.get("/fetch-category-products/:slug", async(req, res) => {
    const slug = req.params.slug
    const response = await fetchcategoryproducts(slug);
    const { success, status, message, products } = response;
    if(status === 200){
        return res.status(status).json({
            status,
            success,
            message,
            products
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
module.exports = categoryRouter