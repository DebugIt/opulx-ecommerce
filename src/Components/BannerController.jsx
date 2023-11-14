import React, { useEffect, useState } from 'react'

// dropdown
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

// progress
import LinearProgress from '@mui/material/LinearProgress';

// snackbar
import Snackbar from '@mui/material/Snackbar';

const BannerController = () => {
    const API = import.meta.env.VITE_BASE_URL
    const [selection, setSelection] = useState('');
    const [imgPreviews, setImgPreviews] = useState([])

    const [update, setUpdate] = useState(false)

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openmsg, setOpenmsg] = useState("");

    const token = localStorage.getItem("opulx-admin-token")
    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [position, setPosition] = useState()
    const [url, setUrl] = useState()

    const [img, setimg] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    // upload banners
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
          setUrl(response?.data?.image_url)
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setOpen(!open);
          setOpenmsg(error.response?.data?.message);
          console.error(error);
        }
    };


    // Fetching banners
    const fetchOnlyHome = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/banner/getbanner_home`)
            console.log(response.data?.banners)
            setImgPreviews(response.data?.banners)
            setOpen(true)
            setOpenmsg(response.data?.message)
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error)
            setOpen(true)
            setOpenmsg(error.message)
            setLoading(false)
        }
    }

    const fetchOnlyCategory = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/banner/getbanner_category`)
            console.log(response.data?.banners)
            setImgPreviews(response.data?.banners)
            setOpen(true)
            setOpenmsg(response.data?.message)
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error)
            setOpen(true)
            setOpenmsg(error.message)
            setLoading(false)
        }
    }
    
    const fetchAll = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/banner/getallbanners`, {
                headers: {
                    "token": token
                }
            })
            console.log(response.data?.banners)
            setImgPreviews(response.data?.banners)
            setOpen(true)
            setOpenmsg(response.data?.message)
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error)
            setOpen(true)
            setOpenmsg(error.message)
            setLoading(false)
        }
    }



    // create banner
    const createnewBanner = async() => {
        try {
            setLoading(true)
            if(!position || !title || !url){
                setOpen(!open)
                setOpenmsg("Please fill all the fields")
                setLoading(false)
            }else {
                const data = {
                    "position": position,
                    "title": title,
                    "url": url
                }
                const response = await axios.post(`${API}/api/banner/addbanner`, data, {
                    headers: {
                        "token": token
                    }
                })
                console.log(response.data)
                setOpen(!open)
                setOpenmsg(response.data?.message)
                setTitle("")
                setPosition("")
                setUrl("")
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
            console.log(error)
            setOpen(true)
            setOpenmsg(error.message)
            setLoading(false)
        }
    }

    // remove banner
    const deleteBanner = async() => {
        try {
            setLoading(true)
            if(!id){
                setOpen(!open)
                setOpenmsg("Please fill all the fields")
                setLoading(false)
            }else {
                const response = await axios.delete(`${API}/api/banner/removebanner/${id}`, {
                    headers: {
                        "token": token
                    }
                })
                console.log(response.data)
                setOpen(!open)
                setOpenmsg(response.data?.message)
                setTitle("")
                setPosition("")
                setUrl("")
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
            console.log(error)
            setOpen(true)
            setOpenmsg(error.message)
            setLoading(false)
        }
    }



    
    useEffect(() => {
      if(selection === "Home"){
        fetchOnlyHome()
      }
      else if(selection === "Category"){
        fetchOnlyCategory()
      }
      else if(selection === "getall"){
        fetchAll()
      }
    }, [selection])
    
    


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
        <div id="file-upload-container" className="py-5 border-b-2 border-black  w-full">
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
              className='my-3 px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500'
            >
              Upload Banner
            </button>
        </div>

        <div id="container" className='m-4 flex'>
            <div id="selection" className='w-[35%]'>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl className='w-full mx-3'>
                        <InputLabel id="demo-simple-select-label">Fetch banners according to positions</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selection}
                        label="Banner"
                        onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="getall">Fetch All</MenuItem>
                            <MenuItem value="Home">Home</MenuItem>    
                            <MenuItem value="Category">Category</MenuItem>    
                        </Select>
                    </FormControl>
                </Box>
                
                {/* For update */}
                <p className='mt-5 text-xl font-semibold underline mb-3'>Banner Actions</p>
                <div className=''>
                    <input className='mb-3 py-2 px-3 w-full border-b-2 hover:border-black transition ease-in-out duration-500' placeholder='Click image to get its id' type="text" value={id} onChange={e => setId(e.target.value)}/>
                    <button
                        onClick={deleteBanner}
                        className='my-1 px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500'
                    >
                    Delete Banner
                    </button>
                </div>

                <div id="addbanner" className='my-8'>
                    <p className='font-semibold'>{update ? "Update Banner" : "Create New Banner"}</p>
                    <input className='mb-3 py-2 px-3 w-full border-b-2 hover:border-black transition ease-in-out duration-500' placeholder='Enter Banner title' type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    <input className='mb-3 py-2 px-3 w-full border-b-2 hover:border-black transition ease-in-out duration-500' placeholder='Enter Banner position' type="text" value={position} onChange={e => setPosition(e.target.value)}/>
                    <input className='mb-3 py-2 px-3 w-full border-b-2 hover:border-black transition ease-in-out duration-500' placeholder='Enter Banner Url' type="text" value={url} onChange={e => setUrl(e.target.value)}/>
                    <button
                        onClick={update ? "Update Banner" : createnewBanner}
                        className='my-1 px-3 py-2 rounded-sm border outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500'
                    >
                    {update ? "Update Banner" : "Create New Banner"}
                    </button>
                </div>
            
            </div>
            <div id="part2" className='mx-4 w-[65%]'>
                <p className='underline underline-offset-2'>Preview will be Loaded here:</p>
                <div className='h-[50vh] overflow-y-scroll overflow-x-hidden'>
                    {
                        imgPreviews.map((img) => (
                            <img className='m-2' key={img.title} src={img.imageUrl} alt={img.title} onClick={() => setId(img._id)}/>
                        ))
                    }    
                </div>   
            </div>
        </div>
    </>
  )
}

export default BannerController