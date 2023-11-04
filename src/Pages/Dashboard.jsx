import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import { useNavigate } from 'react-router-dom'

// progress
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// snackbar
import Snackbar from '@mui/material/Snackbar';

// icons
import { GrUserAdmin } from "react-icons/gr"
import { BiCategory } from "react-icons/bi"
import { LiaProductHunt } from "react-icons/lia"
import { BsBoxes } from "react-icons/bs"

// component imports
import VerifyAdmin from "../Components/VerifyAdmin"
import CategoryController from "../Components/CategoryController"
import OrderController from "../Components/OrderController"
import ProductController from "../Components/ProductController"


const Dashboard = () => {
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity } = useContext(OpulxContext)
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openmsg, setOpenmsg] = useState("");

    // controller states
    const [verify, setVerify] = useState(true)
    const [category, setCategory] = useState(false)
    const [product, setProduct] = useState(false)
    const [order, setOrder] = useState(false)

    // specials
    const [storecat, setStoreCat] = useState([{name: "lol"}])
    const [storeId, setStoreId] = useState()
    

    // FUNCTIONS
    // verify admin ✅
    // create category ✅
    // update category ✅
    // delete category ✅
    // create product && upload image ✅
    // delete product ✅
    // update product ✅
    // get all orders
    // fetch pending, deliviered, and cancelled orders
    // change order status - only admin

    // UPCOMING
    // total sales
    // email to customers


    
    



    // Check if Logged in 
    useEffect(() => {
        const getStat = localStorage.getItem("opulx-admin-token")
        if(!getStat){
          setIsLoggedIn(false)
          console.log("Not logged-in")
          navigate("/")
        }else{
          setIsLoggedIn(true)
          console.log("logged-in")
        }
    }, [])
    


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
        <div id="container" className='m-4' style={{fontFamily: 'Montserrat'}}>
            <div id="border-box" className='grid place-items-center bg-[#121212] rounded-md p-12 my-4'>
                <p className='text-5xl opacity-70 font-bold text-white'>
                    Opulx Dashboard • New Features coming soon!
                </p>
            </div>
            <div id="home-container" className='flex'>
                <div id="sidebar" className='p-3 w-[25%] grid place-items-center '>
                    <div className='p-10 px-16 grid place-items-center border-r-2 border-b-2 border-black'>
                        <ul>
                            <li className={`my-2 hover:underline flex cursor-pointer ${verify ? ("underline") : ("")}`} onClick={() => {setVerify(true); setCategory(false); setProduct(false); setOrder(false);}}><GrUserAdmin className='mx-1'  size={20}/> Verify Admin</li>
                            <li className={`my-2 hover:underline flex cursor-pointer ${category ? ("underline") : ("")}`} onClick={() => {setVerify(false); setCategory(true); setProduct(false); setOrder(false);}}><BiCategory className='mx-1' size={20}/> Category Controls</li>
                            <li className={`my-2 hover:underline flex cursor-pointer ${product ? ("underline") : ("")}`} onClick={() => {setVerify(false); setCategory(false); setProduct(true); setOrder(false);}}><LiaProductHunt className='mx-1' size={20}/> Product Controls</li>
                            <li className={`my-2 hover:underline flex cursor-pointer ${order ? ("underline") : ("")}`} onClick={() => {setVerify(false); setCategory(false); setProduct(false); setOrder(true);}}><BsBoxes className='mx-1' size={20}/> Order Controls</li>
                            
                        </ul>
                    </div>
                    {
                        (category || product) ? (
                            <>
                                <div className='my-5 p-10 px-16 grid place-items-center border-r-2 border-b-2 border-black'>
                                    <ul>
                                            <p className='font-semibold underline underline-offset-2'>Available Categories</p>
                                            {
                                                storecat.map((item) => (
                                                    <>
                                                        <li className={`my-2 cursor-pointer hover:underline`} onClick={() => {navigator.clipboard.writeText(item._id); setStoreId(item._id)}}>{item.name}</li>
                                                    </>
                                                ))
                                            }
                                    </ul>
                                </div>
                            </>
                        ) : ("")
                    }
                </div>
                <div id="mainArea" className='w-[75%]'>
                    {
                        (verify) ? (
                            <>
                                <VerifyAdmin />
                            </>
                        ) : (category) ? (
                            <>
                                <CategoryController setStoreCat={setStoreCat} storeId={storeId}/>
                            </>
                        ) : (product) ? (
                            <>
                                <ProductController setStoreCat={setStoreCat} storeId={storeId}/>
                            </>
                        ) : (order) ? (
                            <>
                                <OrderController />
                            </>
                        ) : (
                            <VerifyAdmin />
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard