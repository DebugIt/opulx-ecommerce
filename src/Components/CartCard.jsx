import React, { useState } from 'react'

const CartCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1)

    const handleQuantity = (operation) => {
        if(operation === "+"){
          setQuantity(prev=> prev + 1 )
        }else{
          if(quantity > 1){
            setQuantity(prev=> prev - 1 )
          }
        }
      }
  return (
    <>
        
    </>
  )
}

export default CartCard