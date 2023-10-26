const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const Product = require("../models/Product");


module.exports = {
    createproduct: async (data) => {
        try {
            const checkForExistancce = await Product.findOne({name:data.name});
            if(checkForExistancce){
                return {
                    status: 409,
                    success: false,
                    message: "The product already Exists",
                    prod: null
                }
            }
            else{
                const newProduct = await new Product({
                    name: data.name,
                    slug: slugify(data.name),
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    quantity: data.quantity,
                    shipping: data.shipping,
                    photo: data.photo
                })
                await newProduct.save()
                if(newProduct){
                    return {
                        status: 201,
                        success: true,
                        message: "New Product added!",
                        prod: newProduct
                    }
                }else{
                    return {
                        status: 500,
                        success: false,
                        message: "Failed to add the product",
                        prod: null
                    }
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error creating product"
            };
        }
    },


    uploadimage: async (photo) => {
        try {
            console.log(process.env.CLOUDINARY_API_KEY)
            const uploadImage = await cloudinary.uploader.upload(
                photo.tempFilePath,
                {
                    folder: "Ecommerce",
                }
            );
            if(uploadImage){
                return {
                    status: 200,
                    success: true,
                    message: "Upload Successful!",
                    image_url: uploadImage.secure_url
                }
            }
            else{
                return {
                    status: 400,
                    success: false,
                    message: "Uploading Failed!"
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error Uploading Image"
            };
        }
    },


    allproducts: async () => {
        try {
            const products = await Product.find().populate('category').select("-photo");
            if(products){
                return {
                    status: 200,
                    success: true,
                    message: "Products Fetched",
                    data: products
                }
            }else{
                return {
                    status: 400,
                    success: false,
                    message: "No Products Found"
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error Fetching products"
            };
        }
    },


    getProductBySlug: async (slug) => {
        try {
            const findProduct = await Product.findOne({slug}).populate('category').select("-photo");
            if(findProduct){
                return {
                    status: 200,
                    success: true,
                    message: "Product Details Fetched Successfully!",
                    product: findProduct
                }
            }else{
                return {
                    status: 400,
                    success: false,
                    message: "Product Not Found!"
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || `Error fetching product with slug ${slug}`
            };
        }
    },


    getproductphoto: async (pid) => {
        try {
            const product = await Product.findById(pid).select("photo");
            if(product){
                return {
                    status: 200,
                    success: true,
                    message: "Photo found",
                    photo: product.photo
                }
            }else{
                return {
                    status: 400,
                    success: false,
                    message: "No photo found for this product."
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error in getting product photo"
            };
        }
    },


    deleteproduct: async (pid) => {
        try {
            const findToDelete = await Product.findById(pid);
            if(findToDelete){
                const deleteProduct = await Product.findByIdAndDelete(pid)
                if(deleteProduct){
                    return {
                        status: 200,
                        success: true,
                        message: 'Product deleted!'
                    }
                }else{
                    return {
                        status: 400,
                        success: false,
                        message: 'Could not delete the product.'
                    }
                }
            }
            else{
                return {
                    status: 400,
                    success: false,
                    message: 'No product with such id exists'
                }
            }
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error in deleting product"
            };
        }
    },


    updateproduct: async (id, data) => {
        try {
            const newProduct = await Product.findByIdAndUpdate(
                id,
                {
                    name: data.name,
                    slug: slugify(data.name),
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    quantity: data.quantity,
                    shipping: data.shipping,
                    photo: data.photo
                },
                {new:true}    
            )
            await newProduct.save()
            if(newProduct){
                return {
                    status: 201,
                    success: true,
                    message: "Product updated!",
                    prod: newProduct
                }
            }else{
                return {
                    status: 500,
                    success: false,
                    message: "Failed to add the product",
                    prod: null
                }
            }
        
        } catch (error) {
            console.log("Error:", error);
            return {
                status: 500,
                success: false,
                message: error.message || "Error creating product"
            };
        }
    },


};
