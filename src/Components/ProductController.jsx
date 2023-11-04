import React, { useState, useEffect } from 'react'

// progress
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// snackbar
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const ProductController = ({ setStoreCat, storeId }) => {
  const API = import.meta.env.VITE_BASE_URL
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openmsg, setOpenmsg] = useState("");

  // create states
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState(storeId)
  const [quantity, setQuantity] = useState(0)
  const [shipping, setShipping] = useState(true)
  const [img, setimg] = useState("")

  // delete and search
  const [delId, setDelId] = useState()
  const [delName, setDelName] = useState()

  // update states
  const [updating, setUpdating] = useState(false)
  const [readytoUpdate, setReadyToUpdate] = useState([])

  const token = localStorage.getItem("opulx-admin-token")
  
  // 
  
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
    
  
  // create product && upload image
  const createProduct = async () => {
    if (name === "" || description === "" || price === 0 || category === "" || quantity === 0 || img === ""){
      setOpen(!open);
      setOpenmsg("Please Fill all the fields")
    }else{
      try {
        setLoading(true)
        const data = {
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          shipping: shipping,
          photo: img,
        }
        const response = await axios.post(`${API}/api/product/create-product`, data, {
          headers: {
            token: token
          }
        })
        console.log(response)
        setOpen(!open)
        setOpenmsg(response.data?.message)
        setLoading(false)
      } catch (error) {
        setLoading(true)
        setOpen(!open)
        setOpenmsg(error.response?.data?.message)
        console.log(error)
        setLoading(false)
      }
    }
  }


  const uploadImage = async () => {
    if (!selectedImage) {
      console.log('Please select an image');
      return;
    }
  
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('photo', selectedImage);
      console.log(formData);
  
      // Send the formData to your server for image upload
      // You can use axios or any other HTTP client for this.
      const response = await axios.post(`${API}/api/product/uploadimg`, formData, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
  
      setOpen(!open);
      setOpenmsg(response.data?.message);
      setimg(response?.data?.image_url)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      console.error(error);
    }
  };


  // delete product

  // generate-slug
  function generateSlug(text) {
    return text
      .toString() // Ensure it's a string
      .normalize('NFD') // Normalize to decomposed form
      // .toLowerCase() // Convert text to lowercase :: TODO: Optional
      .trim() // Trim leading and trailing spaces
      .replace(/[^a-zA-Z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
      .replace(/^\d+/, ''); // Remove leading digits
  
    // Optionally, you can add .substring(0, maxLength) to limit the slug length
  }
  


  const handleDeleteSearchOperation = async () => {
    const slug = generateSlug(delName);
    // search for product
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/product/get-product/${slug}`, {
        headers: {
          token: token
        }
      })
      console.log(response)
      setOpen(!open)
      setOpenmsg(response.data?.message)
      setDelId(response.data?.product?._id)
      setReadyToUpdate(response?.data)
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open)
      setOpenmsg(error.response?.data?.message)
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API}/api/product/delete-product/${delId}`, {
        headers: {
          token: token
        }
      })
      console.log(response)
      setOpen(!open)
      setOpenmsg(response.data?.message)
      setDelId("")
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open)
      setOpenmsg(error.response?.data?.message)
      setLoading(false);
    }
  }



  // update product
  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      setUpdating(true)
      handleDeleteSearchOperation()
      setName(readytoUpdate.product?.name)
      setDescription(readytoUpdate.product?.description)
      setPrice(readytoUpdate.product?.price)
      setCategory(readytoUpdate.product?.category?._id)
      setQuantity(readytoUpdate.product?.quantity)
      setShipping(readytoUpdate.product?.shipping)
      setimg(readytoUpdate.product?.photo)

      setLoading(false)
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open)
      setOpenmsg(error.response?.data?.message)
      setLoading(false);
    }
  }


  const updateProductDetails = async () => {
    if (name === "" || description === "" || price === 0 || category === "" || quantity === 0 || img === ""){
      setOpen(!open);
      setOpenmsg("Please Fill all the fields")
    }
    else{
      try {
        const data = {
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          shipping: shipping,
          photo: img,
        }
        const response = await axios.put(`${API}/api/product/update-product/${delId}`, data, {
          headers: {
            token: token
          }
        })
        console.log(response)
        setOpen(!open)
        setOpenmsg(response.data?.message)
        setDelId("")
        setUpdating(false)
        setName("")
        setDescription("")
        setPrice(0)
        setCategory("")
        setQuantity(0)
        setShipping()
        setimg("")
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
        setOpen(!open)
        setOpenmsg(error.response?.data?.message)
        setLoading(false);
      }
    }
  }


  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}/api/category/getall-categories`)
      console.log(response.data?.data)
      setStoreCat(response.data?.data)
      setOpen(!open)
      setOpenmsg(response.data?.message)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
      setLoading(false)
    }
    
}

useEffect(() => {
  getCategories()
}, [])

  useEffect(() => {
    // Update the newId state with the storeId prop when the component mounts
    setCategory(storeId);
  }, [storeId]);

  return (
    <>
      {
          loading && (
              <Box>
                <LinearProgress />
              </Box>
          )
      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={openmsg}
      />
      <div id="container" className='m-4 grid grid-cols-2'>
        <div id="product-creation" className='border-r-2 border-black grid px-8'>
          <div id="name">
            <input type="text" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name'/>
          </div>
          <div id="description">
            <textarea type="text" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Product Description'/>
          </div>
          <div id="price">
            <input type="number" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price'/>
          </div>
          <div id="category" className='my-2'>
            <p className='text-sm'>*Click on the Category you want your product to be added to</p>
            <input type="text" className=' p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Product Category Id'/>
          </div>
          <div id="quantity">
            <input type="number" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter Product Quantity'/>
          </div>
          <div id="shipping">
            <input type="text" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={shipping} onChange={(e) => setShipping(e.target.value)} placeholder='Enter Shipping Availability'/>
          </div>
          <div id="imgUrl">
            <input type="text" className='my-2 p-2 w-full outline-none border-b-2 hover:border-black transition ease-in-out duration-300' required={true} value={img} onChange={(e) => setimg(e.target.value)} placeholder='Enter image Url'/>
          </div>

          <button className='px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => {(updating ? updateProductDetails() : createProduct())}}>{updating ? ("Update Product Details") : ("Create Product")}</button>
        </div>
        <div id="product-operations" className='mx-3'>
          
          <p className='text-lg hover:underline underline-offset-1'>Upload Product Image to Generate ImageUrl</p>
          <div id="file-upload-container" className="py-5 border-b-2 border-black flex items-center justify-center w-full">
            <label
              htmlFor="image-upload-input"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-black transition ease-in-out duration-300"
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG </p>
              </div>
            </label>
            <input
              type="file"
              id="image-upload-input"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              onClick={uploadImage}
              className='px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500'
            >
              Upload Product
            </button>
          </div>



          <div id="delete" className='my-4 py-5 border-b-2 border-black'>
            <p className='text-lg hover:underline underline-offset-1'>Delete Product </p>
            <span className='text-sm text-red-500 font-semibold'>*Make sure to write the product name with matching cases</span>
            <div className='flex'>
              <input type="text" className='w-[60%] my-2 mx-2 p-2 outline-none border-b-2' required={true} value={delName} onChange={(e) => setDelName(e.target.value)} placeholder='Enter Product name to generate Id'/>
              <button className='px-2 h-[6vh] rounded-sm  outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => {handleDeleteSearchOperation()}}>Search Product</button>
            </div>
            <div>
              <input type="text" className='my-2 p-2 w-full outline-none border-b-2' required={true} value={delId} onChange={(e) => setDelId(e.target.value)} placeholder='Enter Product Id to Delete'/>
              <button className='px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => {handleDelete()}}>Delete Product</button>
            </div>
          </div>

          <div id="update">
            <div>
              <input type="text" className='my-2 p-2 w-full outline-none border-b-2' required={true} value={delId} onChange={(e) => setDelId(e.target.value)} placeholder='Enter Product Id to Update'/>
              <button className='px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => {fetchProductDetails()}}>Update Product</button>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default ProductController