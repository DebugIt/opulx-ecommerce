import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'

import { MdPayment } from "react-icons/md"
import axios from 'axios'

const Createorder = () => {
    const API_URL = process.env.REACT_APP_BASE_URL
    const RZP_KEY = process.env.REACT_APP_RAZORPAY_API_KEY

    const { orderProductDetails, setorderProductDetails, cart, setCart } = useContext(OpulxContext)
    const uid = localStorage.getItem("userid-opulx")
    const utoken = localStorage.getItem("usertoken-opulx")
    const [user, setUser] = useState(uid)
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
        e.preventDefault()
        //FIXME: get products 
        
        try {
            const data = {
                user: uid,
                products: cart,
                address: address
            }
            const response = await axios.post(`${API_URL}/api/order/create-order`, data, {
                headers: {
                    token: utoken
                }
            })
            console.log(response)
            handleCheckout(response.data?.order_details?.totalPrice)
            localStorage.setItem("opulx-checkout", JSON.stringify([]))
            localStorage.setItem("userCart-opulx", JSON.stringify([]))
        } catch (error) {
            console.log(error)
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
                axios.post(`${API_URL}/api/order/verify-razor-order`, data).then((res) => {
                    console.log(res)
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
        <div id="checkout" style={{ fontFamily: 'Montserrat' }} className='m-4 grid place-items-center'>
            <h1>Check Out • Add Details</h1>
            <form onSubmit={handleSubmit}>
                <div id="form-container" className=''>
                    {/* <div id="user">
                        <input className='border my-1 p-1 w-full' value={user} disabled placeholder='User' required type="text" />
                    </div> */}
                    <div>
                        <input className='border my-1 p-1 w-full' placeholder="Enter Reciever's name" required type="text" name="name" value={address.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input className='border my-1 p-1 w-full' placeholder='Enter email' required type="email" name="email" value={address.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input className='border my-1 p-1 w-full' placeholder='Enter Phone no.' required type="number" name="phone" value={address.phone} onChange={handleInputChange} />
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
    </>
  )
}

export default Createorder