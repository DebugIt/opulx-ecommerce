const Banner = require("../models/Banner");

module.exports = {
    getforhome : async () => {
        try {
            const findforhome = await Banner.find({ position:"home" })
            if(findforhome){
                return {
                    status: 200,
                    success: true,
                    message: "Banner fetched",
                    banners: findforhome
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Banners found for home page",
                    banners: null
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

    getforcategory : async () => {
        try {
            const findforcategory = await Banner.find({ position:"category" })
            if(findforcategory){
                return {
                    status: 200,
                    success: true,
                    message: "Banner fetched",
                    banners: findforcategory
                }
            }else{
                return {
                    status: 404,
                    success: false,
                    message: "No Banners found for home page",
                    banners: null
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

    addBanner: async ( data ) => {
        try {
            if(!data){
                return {
                    status: 406,
                    success: false,
                    message: 'Fields required!'
                }
            }
            else{
                const newBanner = await new Banner(data).save()
                if(newBanner){
                    return {
                        status: 201,
                        success: true,
                        message: 'New Banner added',
                        banner: newBanner
                    }
                } else{
                    return {
                        status: 409,
                        success: false,
                        message: 'Failed to create a new Banner',
                        banner: null
                    }
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

    deletebanner: async ( bannerid ) => {
        try {
            const findbanner = await Banner.findById(bannerid)
            if(!findbanner){
                return {
                    status: 404,
                    success: false,
                    message: "No Such banner found"
                }
            }else{
                const deletebanner = await Banner.deleteOne({_id : bannerid})
                if(deletebanner){
                    return {
                        status: 200,
                        success: true,
                        message: "Banner Deleted Successfully!"
                    }
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

    getall: async () => {
        try {
            const getallbanner = await Banner.find()
            if(getallbanner){
                return {
                    status: 200,
                    success: true,
                    message: 'All Banners fetched successfully!',
                    banners: getallbanner
                }
            }
            else{
                return {
                    status: 404,
                    success: false,
                    message: 'No Banners found',
                    banners: null
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