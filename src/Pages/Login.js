import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';
import OpulxContext from '../context/OpulxContext';


const Login = () => {
  const API_URL = process.env.REACT_APP_BASE_URL
  const { loginactivity, setLoginActivity } = useContext(OpulxContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
          email,
          password
        }
        const response = await axios.post(`${API_URL}/api/users/login`, data)
        // console.log(response.data)
        setEmail("")
        setPassword("")
        setLoading(false)

        localStorage.setItem("usertoken-opulx", response.data.token)
        localStorage.setItem("userid-opulx", response.data.id)
        localStorage.setItem("userlogstatus-opulx", "true")
        setOpenErr(!openErr);
        setLoginActivity(true)
        setMsg(response.data?.message)
        navigate("/profile")
        localStorage.setItem('userCart-opulx', [])

      } catch (error) {
        setLoading(true)
        console.log(error)
        setOpenErr(!openErr)
        setMsg(error.response?.data?.message)
        setLoginActivity(false)
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
        <div id="container" className='mx-2 flex flex-col justify-center my-24'>
          <p className='my-3 text-3xl font-semibold'>Login</p>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <p>Don't have an account? <span className='underline underline-offset-2 cursor-pointer' onClick={() => navigate("/signup")}>Join us today!</span></p>
          <button className={`font-semibold my-3 py-2 bg-[#f9f6e5] hover:bg-[#dad1a1] transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  )
}

export default Login