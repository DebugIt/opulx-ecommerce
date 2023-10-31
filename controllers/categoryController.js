const Category = require("../models/Category")
const Product = require("../models/Product")
const slugify = require("slugify");
module.exports = {
    create: async (name) => {
        try {
            if (!name) {
                return {
                    status: 400,
                    success: false,
                    message: "Name is required",
                };
            }
    
            // Check if a category with the same name already exists
            const existingCategory = await Category.findOne({ name });
    
            if (existingCategory) {
                // Category with the same name already exists, do not create a new one
                return {
                    status: 200,
                    success: true,
                    message: "Category with the same name already exists",
                    data: existingCategory,
                };
            }
    
            // Create a new category
            const newCategory = await new Category({ name, slug: slugify(name) }).save();
    
            return {
                status: 201,
                success: true,
                message: "Category Created",
                data: newCategory,
            };
        } catch (error) {
            console.error(error); // Log the actual error message for debugging
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    },

    update : async (id, newName) => {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, {name:newName, slug:slugify(newName)}, {new:true});
            if(updatedCategory){
                return {
                    status: 200,
                    success: true,
                    message: 'Updated Successfully',
                    data: updatedCategory
                }
            }
        } catch (error) {
            console.error(error); // Log the actual error message for debugging
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    },

    getAll: async () => {
        try {
            const getall = await Category.find();
            if(getall){
                return {
                    status: 200,
                    success: true,
                    message: 'Categories Retrieved Successfully',
                    data: getall
                }
            }
        } catch (error) {
            console.error(error); // Log the actual error message for debugging
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    },

    getindividual: async (slug) => {
        try {
            const findIndividualCategory = await Category.findOne({slug});
            if(findIndividualCategory){
                return {
                    status: 200,
                    success: true,
                    message: 'Category Retrieved Successfully',
                    data: findIndividualCategory
                }
            }
            else{
                return {
                    status: 404,
                    success: false,
                    message: 'No category found with Slug'
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    },

    deletecategory: async (id) => {
        try {
            const delete_individual = await Category.findByIdAndDelete(id);
            if(delete_individual){
                return {
                    status: 200,
                    success: true,
                    message: 'Deletion successful'
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: 'No category found with this id'
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    },

    fetchcategoryproducts: async (slug) => {
        try {
            const findIndividualCategory = await Category.findOne({slug});
            if(findIndividualCategory){
                const lookForProducts = await Product.find({category:findIndividualCategory._id})
                if(lookForProducts){
                    return {
                        status: 200,
                        success: true,
                        message: "Products for the matching category found!",
                        products: lookForProducts
                    }
                }else{
                    return {
                        status: 404,
                        success: false,
                        message: "No product found in this category",
                        products: null
                    }
                }
            } 
            else{
                return {
                    status: 404,
                    success: false,
                    message: "No such category exists"
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                success: false,
                message: error.message || "Internal Server Error",
            };
        }
    }
    
    
}