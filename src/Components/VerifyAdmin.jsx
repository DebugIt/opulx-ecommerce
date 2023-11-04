import React, { useState } from 'react'

// progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// snackbar
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const VerifyAdmin = () => {
  const API = import.meta.env.VITE_BASE_URL
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openmsg, setOpenmsg] = useState("");

  const [id, setId] = useState("")

  const handleVerificationProcess = async () => {
    if(id === ""){
      setOpen(!open)
      setOpenmsg("Id Field required!")
    }
    else{
      try {
        setLoading(true)
        const data = {
          "newStatus": "ACTIVE" // Replace with the desired verification status (e.g., "ACTIVE" or "NOT ACTIVE")
        }
        const token = localStorage.getItem("opulx-admin-token")
        const response = await axios.put(`${API}/api/admin/verifyadmins/${id}`, data,{
          headers: {
            token: token
          }
        })
        setId("")
        setOpen(!open)
        setOpenmsg(response.data?.message)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }



  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={openmsg}
      />
      <div id="container" className='border-b-2 border-black m-4 grid place-items-center items-center'>
        <p className='text-xl font-semibold my-4'>Verify Admin</p>
        <div>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='w-[50%] p-2 border-b-2 outline-none' placeholder='Enter Admin Id'/>
          <button className='mx-2 px-3 py-2 rounded-sm outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => handleVerificationProcess()}>Verify Admin</button>  
        </div>
        <div className='my-10'>
          {
            loading && (
              <Box >
                <CircularProgress />
              </Box>
            )
          }
        </div>
      </div>
    </>
  )
}

export default VerifyAdmin