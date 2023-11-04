import React, { useContext, useEffect, useState } from 'react'

// progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// snackbar
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import OpulxContext from '../context/OpulxContext';

const CategoryController = ({ setStoreCat, storeId }) => {

  const API = import.meta.env.VITE_BASE_URL
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openmsg, setOpenmsg] = useState("");

  // 
  const [newCat, setNewCat] = useState("")
  // 
  const [newid, setNewId] = useState(storeId)
  const [newName, setNewName] = useState("")
  // 
  const [del, setDel] = useState()


  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}/api/category/getall-categories`)
      console.log(response.data?.data)
      setStoreCat(response.data?.data)
      setOpen(!open)
      setOpenmsg(response.data?.message)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
      setLoading(false)
    }
    
  }

  const createNewCategory = async() => {
    try {
      setLoading(true)
      const data = {
        name: newCat,
      }
      const token = localStorage.getItem("opulx-admin-token")
      const response = await axios.post(`${API}/api/category/create-category`, data, {
        headers: {
          token: token
        }
      }) 
      console.log(response)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(response.data?.message)
    } catch (error) {
      setLoading(true)
      console.log(error)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(error.message) || setOpenmsg(error.response?.data?.message)
    }
  }

  const updateCategory = async() => {
    try {
      setLoading(true)
      const data = {
        newName: newName,
      }
      const token = localStorage.getItem("opulx-admin-token")
      const response = await axios.put(`${API}/api/category/update-category/${newid}`, data, {
        headers: {
          token: token
        }
      }) 
      console.log(response)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(response.data?.message)
    } catch (error) {
      setLoading(true)
      console.log(error)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(error.message) || setOpenmsg(error.response?.data?.message)
    }
  }

  const deleteCategory = async() => {
    try {
      setLoading(true)
      const data = {
        name: newCat,
      }
      const token = localStorage.getItem("opulx-admin-token")
      const response = await axios.delete(`${API}/api/category/delete-category/${newid}`, {
        headers: {
          token: token
        }
      }) 
      console.log(response)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(response.data?.message)
    } catch (error) {
      setLoading(true)
      console.log(error)     
      setLoading(false)
      setOpen(!open);
      setOpenmsg(error.message) || setOpenmsg(error.response?.data?.message)
    }
  }


  useEffect(() => {
    getCategories()
  }, [])

  


  
  useEffect(() => {
    // Update the newId state with the storeId prop when the component mounts
    setNewId(storeId);
  }, [storeId]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={openmsg}
      />
      <div id="container" className='m-4 grid grid-cols-2'>
        <div id="create" className='mx-4 border-r-2 border-b-2  border-black py-4'>
          <p className='py-3 text-xl font-semibold'>Create Category</p>
          <div id="action" className='my-8'>
            <input type="text" required value={newCat} onChange={(e) => setNewCat(e.target.value)} className='w-[50%] p-2 border-b-2 outline-none' placeholder='New Category'/>
            <button disabled={loading ? true : false} className={`mx-2 px-3 py-2 rounded-sm outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} onClick={() => {createNewCategory()}}>Add Category</button>  
          </div>
        </div>

        <div id="update" className='mx-4 border-b-2  border-black py-4'>
          <p className='py-3 text-xl font-semibold'>Update Category <span className='text-sm'>*click on category to copy its id</span></p>
          <div id="action" className='my-8'>
            <input type="text" required value={newid} onChange={(e) => setNewId(e.target.value)} className='mx-1 w-[50%] p-2 border-b-2 outline-none' placeholder='Enter category id to update'/>
            {
              (newid !== "") ? (
                <>    
                  <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} className='mx-1 w-[50%] p-2 border-b-2 outline-none' placeholder='Enter new Category name'/>
                  <button disabled={loading ? true : false} className={`mx-2 px-3 py-2 rounded-sm outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} onClick={() => {updateCategory()}}>Update Category</button>  
                </>
              ) : ("")
            }
          </div>
        </div>

        <div id="delete" className='mx-4 border-b-2  border-black py-4'>
          <p className='py-3 text-xl font-semibold'>Delete Category <span className='text-sm'>*click on category to copy its id</span></p>
          <div id="action" className='my-8'>
            <input type="text" required value={newid} onChange={(e) => setNewId(e.target.value)} className='mx-1 w-[50%] p-2 border-b-2 outline-none' placeholder='Enter category id to update'/>
            <button disabled={loading ? true : false} className={`mx-2 px-3 py-2 rounded-sm outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} onClick={() => {deleteCategory()}}>Delete Category</button>  
            
          </div>
        </div>
        
        
      </div>
    </>
  )
}

export default CategoryController