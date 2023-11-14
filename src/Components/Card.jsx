import React, { useContext } from 'react'
import OpulxContext from '../context/OpulxContext';
import { useNavigate } from 'react-router-dom';

const Card = ({ pname, imgUrl, desc, price, slug }) => {

    const { individualProduct, setIndividualProduct } = useContext(OpulxContext)
    const navigate = useNavigate()


  return (
    <>
        <div id="card-container" className='mx-1 my-2' onClick={() => {setIndividualProduct(`${slug}`); navigate(`/product/${slug}`)}}>
            <div id="img" className='h-auto w-full'>
                <img className='w-full h-full object-cover'  src={imgUrl} alt={pname} />
            </div>
            <div id='prod name' className='font-semibold'>
                {pname}
            </div>
            {/* <div id="description" className='text-xs w-full h-[3vh] overflow-hidden'>
                {desc}
            </div> */}
            <div id="price">
                ₹{price}/-
            </div>
        </div>
    </>
  )
}

export default Card