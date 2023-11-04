import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import axios from 'axios'

import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';

const IndividualOrder = () => {
  const API_URL = process.env.REACT_APP_BASE_URL
  const { orderid, setOrderid } = useContext(OpulxContext)
  const navigate = useNavigate()

  const [orderdetails, setOrderdetails] = useState([])
  const [orderproducts, setOrderproducts] = useState([])

  const [loading, setLoading] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [snkMsg, setSnkMsg] = useState(false)


  const fetchOrderDetails = async() => {
    try {
      setLoading(true)
      const token = localStorage.getItem("usertoken-opulx")
      const response = await axios.get(`${API_URL}/api/order/get-particular/${orderid}`, {
        headers: {
          token: token
        }
      })
      console.log(response)
      setOrderdetails(response.data?.order)
      setOrderproducts(response.data?.order?.products)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])
  




  return (
    <>
    {/* snackbars */}
    <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(!openSnack)}
        message={snkMsg}
      />
      {
        loading ? (
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : ("")
      }
      <div id="container" className='m-4' style={{fontFamily: 'Montserrat'}}>
        <div className='flex '>
          <IoIosArrowBack onClick={() => navigate(-1)} size={25} className='mr-3'/>
          <h1><span className='font-semibold underline underline-offset-2'>Order Details for OrderId:</span> {orderid}</h1>
        </div>
        <div id="order-details" className='rounded my-4 p-2 border-2 border-dashed'>
          <div id="address-and-details">
            <span className='underline'>Name:</span> {orderdetails.address?.name} <br/>
            <span className='underline'>Email:</span> {orderdetails.address?.email} <br/>
            <span className='underline'>Shipping address:</span> {orderdetails.address?.line1} <br/>
            <span className='underline'>Pincode:</span> {orderdetails.address?.pincode} <br/>
            <span className='underline'>ContactNumber:</span> {orderdetails.address?.phone} <br/>
            <hr className='my-2 border border-dashed'/>
            <span className='underline'>Order Date:</span> {new Date(orderdetails.createdAt).toLocaleDateString()} <br/>
            <span className='underline'>Order Status:</span> {orderdetails.status} <br/>
            <span className='underline'>Last updated:</span> {new Date(orderdetails.updatedAt).toLocaleDateString()} <br/>
            <span className='underline'>Order Total:</span> {orderdetails.totalPrice}/- <br/>
            <hr className='my-2 border border-dashed'/>
            Products:  <br/>
            {
              orderproducts.map((product) => (
                <div className='flex my-2 shadow' key={product._id}>
                   <div className='w-[30%]'>
                    <img className='h-full' src={product.imageURLs} alt={product.name} /></div> 
                   <div className='mx-1'>
                    Name: {product.name} <br/> 
                    Price: ₹{product.price} <br/> 
                    Quantity: {product.quantity} <br/> 
                   </div> 
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default IndividualOrder