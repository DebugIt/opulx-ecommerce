import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import axios from 'axios'

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import Card from '../Components/Card';

import banner_home from "../Assets/banner_home.png"
import banner2 from "../Assets/banner2.png"


const IndividualProduct = () => {
  const API_URL = process.env.REACT_APP_BASE_URL
  const { individualProduct, setIndividualProduct, isLoggedIn, setIsLoggedIn, addToCart, cartMessage, setCartMessage, cartAlert, setCartAlert } = useContext(OpulxContext)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [snkMsg, setSnkMsg] = useState(false)

  const [productDetails, setProductDetails] = useState({})

  const [prodHome, setProdHome] = useState([])

  // 
  const [quantity, setQuantity] = useState(0)


  const fetchProduct = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/product/get-product/${individualProduct}`)
      console.log(response.data?.product)
      setProductDetails(response.data?.product)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
      setSnkMsg(error.response?.message)
      setLoading(false)
    }
  }

  const fetchProductsForHome = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/product/limited-products/10`)
      console.log(response.data?.data)
      setProdHome(response.data?.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  

  useEffect(() => {
    fetchProduct()
    fetchProductsForHome()
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
      <Snackbar
        open={cartAlert}
        autoHideDuration={4000}
        onClose={() => setCartAlert(!cartAlert)}
        message={cartMessage}
      />
      {
        loading ? (
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : ("")
      }
      <div className='m-2 my-[10vh]' style={{fontFamily: 'Montserrat'}}>
        <div id="page-container" className='m-2 md:flex  my-[10vh]' style={{fontFamily: 'Montserrat'}}>
          <div className='md:w-[40%]'>
            <div id="pimage" className='w-full h-full flex justify-center'>
              <img className='h-[80vh]' src={productDetails.photo} alt={productDetails.name} />
            </div>
          </div>
          <div className='mx-[2vw] md:mx-[10vh] md:w-[60%]'>
            <div id="pname" className='my-2 text-2xl md:text-4xl md:font-bold '>
              {productDetails.name}
            </div>
            
            <div id="bottom-content" className='my-3 mx-2'>
              <div id="pdesc" className='text-sm'>
                {productDetails.description}
              </div>
              <div id="price" className='my-2 font-bold'>
              ₹<span>{productDetails.price}</span>/-
              </div>
              <div id="available-quantity" className='text-sm'>
                Available Quantity: <span className='font-bold'>{productDetails.quantity}</span>
              </div>
              <div id="category" className='text-sm'>
                Category: <span className='font-bold'>{productDetails.category?.name}</span>
              </div>
              <div id="shipping" className='text-sm'>
                Available to Ship : <span className='font-bold'>
                  {(productDetails.shipping === true) ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </span>
              </div>
            </div>
            <div id="select-quantitive" className='mx-4 flex justify-between'>
              <button onClick={() => {setQuantity(quantity+1)}}>+</button>
              <input value={quantity} onChange={(e) => {setQuantity(Number(e.target.value))}} type="number" className='outline-none text-center' placeholder='Enter quantity'/>
              <button onClick={() => {(quantity > 1) ? (setQuantity(quantity-1)) : (setQuantity(0))}}>-</button>
            </div>
            <div className='grid place-items-center my-2'>
              <button className={`font-semibold my-1 py-2 w-full bg-[#f9f6e5] hover:bg-[#dad1a1] transition ease-in-out duration-500 `} disabled={(quantity <= 0) ? true : false} onClick={() => {addToCart(productDetails, quantity)}}>Add to Cart</button>
              {
                isLoggedIn ? (
                <button className={`font-semibold my-1 py-2 w-full bg-[#f9f6e5] hover:bg-[#dad1a1] transition ease-in-out duration-500`} onClick={() => {navigate('/cart')}}>BuyNow</button>
                ) : ("")
              }
            </div>
          </div>

        </div>
        <div className='m-5'>

          <div id="homebanner" className='mt-5 bg-blue-300'>
            <img className='h-full w-full' src={banner2} alt="" />
          </div>

          {
            loading ? (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="inherit" />
              </Stack>
            ) : (
              <div id="range-of-prod">
                <p className='font-semibold my-4 text-xl'>Our Range of Products</p>
                <div id="top-products" className='grid grid-cols-2 md:grid-cols-5' style={{fontFamily: 'Montserrat'}}>
                  {
                    prodHome.map((item, index) => (
                      <Card key={index} pname={item.name} imgUrl={item.photo} desc={item.description} price={item.price} slug={item.slug}/>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default IndividualProduct