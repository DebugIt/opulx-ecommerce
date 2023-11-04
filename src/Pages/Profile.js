import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiEdit3 } from "react-icons/fi"

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';


const Profile = () => {
  // FIXME: ADD EDIT function
  const API_URL = process.env.REACT_APP_BASE_URL

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()

  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [snkMsg, setSnkMsg] = useState(false)



  const getUserDetails = async() => {
    try {
      setLoading(true)
      const token = localStorage.getItem("usertoken-opulx")
      const id = localStorage.getItem("userid-opulx")
      
      const response = await axios.get(`${API_URL}/api/users/fetchuser/${id}`, {
        headers: {
          token: token
        },
      })
      setOpenSnack(true)
      setSnkMsg(response.data.message)
      
      setName(response.data?.user?.name)
      setEmail(response.data?.user?.email)
      setPhone(response.data?.user?.phone)
      setAddress(response.data?.user?.address)
      
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
      setOpenSnack(true)
      setSnkMsg(error.response?.statusText)
      setLoading(false)
      
    }
  }

  useEffect(() => {
    getUserDetails()
    const id = localStorage.getItem("userid-opulx")
    console.log(id)
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
      {
        loading ? (
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : ("")
      }
      <div id="profile-container" style={{fontFamily: 'Montserrat'}} className='m-4'>
        <div id="form-fields">
          <div className="flex justify-between">
            <h1 className='text-2xl font-semibold'>Profile </h1>
            <FiEdit3 className='pt-2' size={25} onClick={() => setEdit(!edit)}/>
          </div>
          <div id="form" className='m-5 flex flex-col justify-center'>
            <input className={`w-full border outline-none p-2 my-1 ${!edit ? ("cursor-not-allowed") : ("")}`} type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!edit} placeholder='Name'/>
            <input className={`w-full border outline-none p-2 my-1 ${!edit ? ("cursor-not-allowed") : ("")}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!edit} placeholder='Email'/>
            <input className={`w-full border outline-none p-2 my-1 ${!edit ? ("cursor-not-allowed") : ("")}`} type="number" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!edit} placeholder='Phone no.'/>
            <textarea className={`w-full border outline-none p-2 my-1 ${!edit ? ("cursor-not-allowed") : ("")}`} type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={!edit} placeholder='Address'/>

            {
              edit ? (
                <button className='my-2 py-2 rounded border'>Save</button>
              ) : (
                ""
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile