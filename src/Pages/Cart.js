import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate()

  const { cart, setCart, removeFromCart } = useContext(OpulxContext)
  let total;

  const [cartValue, setCartValue] = useState(0)
  

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


  return (
    <>
      {
        (cart.length === 0) ? (
          <div id="cart-container" className='m-2' style={{fontFamily: 'Montserrat'}}>
            <h1>Your Shopping Cart is Empty :: Try adding products to cart</h1>
          </div>
        ) : (
          <div>
            <div id="cart-container" className='m-2 text-sm grid grid-cols-2 md:grid-cols-6' style={{fontFamily: 'Montserrat'}}>
              {
                cart.map((item) => (
                  <div key={item.name} className='product p-2 shadow-md'>
                    <div id="imagepreview">
                      <img src={item.imageURLs} alt={item.name} />
                    </div>
                    <h2><span className='font-semibold'>Product:</span> {item.name}</h2>
                    <h3><span className='font-semibold'>Price x Quantity:</span> {item.price} x {item.quantity}</h3>
                    <h3><span className='font-semibold'>Subtotal:</span> ₹{item.price * item.quantity}</h3>
                    <button className='rounded-full text-white text-sm my-1 py-1 px-3 bg-red-700' onClick={()=>removeFromCart(item.name)}>Remove</button>
                  </div>
                ))
              }
            </div>
            <button className='font-semibold my-2 py-2 bg-[#f3ecca] w-full' onClick={() => {navigate("/placeorder")}}>Cart Total: ₹{cartValue}/-</button>
          </div>
        )
      }
    </>
  )
}

export default Cart