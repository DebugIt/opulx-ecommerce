import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';


const Signup = () => {
  const API_URL = process.env.REACT_APP_BASE_URL

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState("")
  
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async() => {
    if(email === "" || password === ""){
        setOpenErr(!openErr);
        setMsg("All Fields Required")
    }
    else{
      try {
        setLoading(true)
        const data = {
          name,
          email,
          password,
          phone,
          address
        }
        const response = await axios.post(`${API_URL}/api/users/register`, data)
        // console.log(response.data)
        setLoading(false)

        
        setOpenErr(!openErr);
        setMsg(response.data?.message)
        navigate("/login")

      } catch (error) {
        setLoading(true)
        console.log(error)
        setOpenErr(!openErr)
        setMsg(error.response?.data?.message)
        setEmail("")
        setPassword("")
        setLoading(false)
      }
    }
  }

  // snackbar
  const [openErr, setOpenErr] = useState(false);
  const [msg, setMsg] = useState("");




  return (
    <>
      {/* snackbars */}
      <Snackbar
        open={openErr}
        autoHideDuration={6000}
        onClose={() => setOpenErr(!openErr)}
        message={msg}
      />
      {
        loading ? (
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : ("")
      }
      <div id="login-container" style={{fontFamily: 'Montserrat'}} className='grid place-items-center items-center'>
        <div id="container" className='mx-2 flex flex-col justify-center my-10'>
          <p className='my-3 text-3xl font-semibold'>Signup</p>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Phone' type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <textarea className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
          <p>Already have an account? <span className='underline underline-offset-2 cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>
          <button className={`font-semibold my-3 py-2 bg-[#f9f6e5] hover:bg-[#dad1a1] transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} onClick={handleLogin}>Signup</button>
        </div>
      </div>
    </>
  )
}

export default Signup