import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
  const navigate = useNavigate()
  return (
    <>
        <div id="container" className='grid place-items-center my-14'>
            <p className='font-bold text-9xl text-[#c6c1a4] '>404</p>
            <p className='font-bold text-[#aca582]'>Broken link or Page NotFound :( </p>
            <p onClick={() => navigate("/")} className='cursor-pointer underline underline-offset-2'>Navigate Home</p>
        </div>
    </>
  )
}

export default Notfound