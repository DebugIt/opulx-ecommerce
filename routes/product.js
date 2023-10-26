const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const productRouter = express.Router()
const { createproduct, uploadimage, allproducts, getProductBySlug, getproductphoto, deleteproduct, updateproduct } = require("../controllers/productController");
const isEither = require("../middlewares/isEither");


productRouter.post("/create-product", isAdmin, async(req, res) => {
    const response = await createproduct(req.body)
    const { success, status, message ,prod } = response
    if(status === 201){
        return res.status(status).json({
            success,
            status,
            message,
            prod
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

productRouter.post("/uploadimg", isAdmin, async(req, res) => {
    console.log(req.files.photo)
    const response = await uploadimage(req.files.photo)
    const { success, status, message, image_url} = response
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            image_url
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

productRouter.get("/all-products", async (req, res) => {
    const response = await allproducts();
    const { success, status, message, data } = response;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            data
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message
        })
    }
})

productRouter.get("/get-product/:slug" ,async (req, res) => {
    const slug = req.params.slug;
    const response = await getProductBySlug(slug);
    const { success, status, message, product } = response;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            product
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message
        })
    }
})

productRouter.get("/get-productphoto/:pid", isEither ,async(req, res) => {
    const pid = req.params.pid;
    const response = await getproductphoto(pid);
    const {success, status, message, photo} = response;

    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            photo
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message
        })
    }
})

productRouter.delete("/delete-product/:id", isAdmin, async(req, res) => {
    const pid = req.params.id
    const repsonse = await deleteproduct(pid);
    const {success, status, message} = repsonse;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message
        })
    }else{
        return res.status(status).json({
            success,
            status,
            message
        })
    }
})

productRouter.put("/update-product/:id", isAdmin, async(req, res) => {
    const id = req.params.id
    const response = await updateproduct(id, req.body)
    const { success, status, message ,prod } = response
    if(status === 201){
        return res.status(status).json({
            success,
            status,
            message,
            prod
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




module.exports = productRouter