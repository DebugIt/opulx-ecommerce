import React, { useContext, useState } from 'react'
import axios from "axios"
// progress
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// snackbar
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import OpulxContext from '../context/OpulxContext';

const Login = () => {
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const { loginactivity, setLoginActivity } = useContext(OpulxContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openmsg, setOpenmsg] = useState("");

    const handleLogin = async() => {
        try {
            setLoading(true)
            const data = {
                email: email,
                password: password
            }
            const response = await axios.post(`${API}/api/admin/login`, data)
            console.log(response.data)
            setOpen(true)
            setOpenmsg(response.data?.message)
            localStorage.setItem("opulx-admin-token", response.data?.token)
            setEmail("")
            setPassword("")
            setLoading(false)
            if(response?.data?.status === 200){
                setLoginActivity(true)
                navigate('/dashboard')
            }
        } catch (error) {
            setLoading(true)
            setOpen(true)
            setOpenmsg(error.response?.data?.message)
            setEmail("")
            setPassword("")
            setLoginActivity(false)
            setLoading(false)
        }
    }
    

  return (
    <>
        {
            loading && (
                <Box>
                    <LinearProgress />
                </Box>
            )
        }
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(!open)}
            message={openmsg}
        />
        <div id="container" className='h-[85vh] grid place-items-center' style={{fontFamily: 'Montserrat'}}>
            <div id="form">
                <p className='font-semibold underline underline-offset-2'>Opulx Admin • Login</p>
                <input value={email} required onChange={(e) => setEmail(e.target.value)} className='w-full border-b-2 outline-none p-2 my-1' type="email" placeholder="Enter Email"/><br/>
                <input value={password} required onChange={(e) => setPassword(e.target.value)} className='w-full border-b-2 outline-none p-2 my-1' type="password" placeholder="Enter Password"/><br/>
                <button className='my-3 px-3 py-2 w-full bg-[#121212] text-white hover:bg-[#fff] hover:text-black hover:border transition ease-in-out duration-500' onClick={() => handleLogin()}>Login</button>
            </div>

        </div>
    </>
  )
}

export default Login