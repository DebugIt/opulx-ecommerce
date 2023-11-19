import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'

import { MdPayment } from "react-icons/md"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Createorder = () => {
    const API_URL = process.env.REACT_APP_BASE_URL
    const RZP_KEY = process.env.REACT_APP_RAZORPAY_API_KEY
    const { orderProductDetails, setorderProductDetails, cart, setCart, removeFromCart } = useContext(OpulxContext)
    const navigate = useNavigate()

    // CART
    let total;

    const [cartValue, setCartValue] = useState(0)
    const [orderid, setOrderId] = useState()

    const [loading, setLoading] = useState(false)
    
    const handleQuantityChange = (itemName, newQuantity) => {
        const updatedCart = cart.map((item) => {
          if (item.name === itemName) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
    
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        total = 0
        cart.map((item) => (
        total = ((item.price * item.quantity) + total)
        ))
        setCartValue(total)
    }
    
    useEffect(() => {
        console.log(cart)
        calculateTotal()
        console.log(total)
    }, [cart])


    const uid = localStorage.getItem("userid-opulx")
    const utoken = localStorage.getItem("usertoken-opulx")
    const [user, setUser] = useState(uid)
    const [controlOrderRoute, setControlOrderRouter] = useState(true)
    const [address, setAddress] = useState({
        name: '',
        email: '',
        phone: '',
        line1: '',
        pincode: ''
    })
    const handleInputChange = (e) => {
        const  { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }

    const handleSubmit = async(e) => {
        setLoading(true)
        console.log(utoken)
        e.preventDefault()
        if(address.phone.length < 10 || address.phone.length > 10){
            alert("Phone number must be of 10 digit")
        }
        else if(address.pincode.length < 6 || address.pincode.length > 6){
            alert("Pincode must be of 10 digit")
        }
        else{
            try {
            
                const data = {
                    user: uid,
                    products: cart,
                    address: address
                }
                const response = await axios.post(`${API_URL}/api/order/create-order`, data, {
                    headers: {
                        "token": utoken
                    }
                })
                console.log(response)
                handleCheckout(response.data?.order_details?.totalPrice)
                localStorage.setItem("orderid", response.data?.order_details?._id)
                localStorage.setItem("opulx-checkout", JSON.stringify([]))
                localStorage.setItem("userCart-opulx", JSON.stringify([]))
                setLoading(false)
                
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    const openRazorPay = async (data) => {
        const options = {
            "key": `${RZP_KEY}`, // Enter the Key ID generated from the Dashboard
            "amount": Number(data.amount),
            "currency": "INR",
            "name": "Opulx Co-orporation",
            "image": "https://res.cloudinary.com/diyhdygip/image/upload/v1698765262/android-chrome-192x192_jlggky.png",
            "order_id": data.id,
            "handler": function (response){
                
                const data = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature 
                }
                setLoading(true)
                axios.post(`${API_URL}/api/order/verify-razor-order`, data).then((res) => {
                    console.log("payment response: ",res)
                    const oid = localStorage.getItem("orderid")
                    const paidstatus = "Paid"
                    const tid = response.razorpay_payment_id
                    const data = {
                        paidstatus, 
                        tid
                    }
                    axios.post(`${API_URL}/api/order/updatepayment/${oid}`, data, {
                        headers: {
                            token: utoken
                        }
                    }).then((res) => console.log(res)).catch(err => console.log(err))
                    console.log(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature)
                    setLoading(false)
                    
                    
                }).catch((err) => console.log(err))
            },
            "theme": {
                "color": "#f9f6e5"
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handleCheckout = async(amount) => {
        try {
            const data = {
                amount: amount
            }
            const response = await axios.post(`${API_URL}/api/order/create-razor-order`, data, {
                headers: {
                    token: utoken
                }
            })
            console.log(response)
            openRazorPay(response.data?.data)
            setAddress({
                name: '',
                email: '',
                phone: '',
                line1: '',
                pincode: ''
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
      console.log(RZP_KEY)
    }, [])
    
    

  return (
    <>
        {
            loading ? (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="inherit" />
            </Stack>
            ) : ("")
        }
        <div id="home" className='md:flex w-full'>
            <div style={{ fontFamily: 'Montserrat' }} className='md:w-[50%]  m-4 flex flex-col justify-center'>
            {
                (cart.length === 0 ? (
                    <div id="cart-container" className="m-2" style={{ fontFamily: 'Montserrat' }}>
                      <h1>Your Shopping Cart is Empty :: Try adding products to the cart</h1>
                    </div>
                  ) : (
                    <div>
                      <div
                        id="cart-container"
                        className="m-2 text-sm grid grid-cols-2 md:grid-cols-3"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {cart.map((item) => (
                          <div key={item.name} className="product p-2 shadow-md">
                            <div id="imagepreview">
                              <img src={item.imageURLs[0]} alt={item.name} />
                            </div>
                            <h2>
                              <span className="font-semibold">Product:</span> {item.name}
                            </h2>
                            <h3>
                              <span className="font-semibold">Price x Quantity:</span> {item.price} x{' '}
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                              />
                            </h3>
                            <h3>
                              <span className="font-semibold">Subtotal:</span> ₹{item.price * item.quantity}
                            </h3>
                            <button
                              className="rounded-full text-white text-sm my-1 py-1 px-3 bg-red-700"
                              onClick={() => removeFromCart(item.name)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        className="font-semibold my-2 py-2 bg-[#f3ecca] w-full"
                        onClick={() => {}}
                      >
                        Cart Total: ₹{cartValue}/-
                      </button>
                    </div>
                ))
            }
            </div>
            <div id="checkout" style={{ fontFamily: 'Montserrat' }} className='md:w-[50%] m-4 flex-row items-center '>
                <h1>Check Out • Add Details</h1>
                <form onSubmit={handleSubmit}>
                    <div id="form-container" className='w-full'>
                        
                        <div>
                            <input className='border my-1 p-1 w-full' placeholder="Enter Reciever's name" required type="text" name="name" value={address.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input className='border my-1 p-1 w-full' placeholder='Enter email' required type="email" name="email" value={address.email} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input className='border my-1 p-1 w-full' placeholder='Enter Phone no.' required type="telephone" name="phone" value={address.phone} onChange={handleInputChange} />
                        </div>
                        <div>
                            <textarea className='border my-1 p-1 w-full' placeholder='Address Line 1' required type="text" name="line1" value={address.line1} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input className='border my-1 p-1 w-full' placeholder='Enter pincode' required type="number" name="pincode" value={address.pincode} onChange={handleInputChange} />
                        </div>
                    </div>
                    <button type="submit" className='bg-[#f9f6e5] py-2 px-3 w-full flex justify-center' >Proceed to Pay <MdPayment className='pt-1' size={20}/></button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Createorder