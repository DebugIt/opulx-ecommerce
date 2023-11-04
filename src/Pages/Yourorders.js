import React, { useContext, useEffect, useState } from 'react'

// icon
import { BsTable, BsCardList } from "react-icons/bs"

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';

import axios from 'axios';
import OpulxContext from '../context/OpulxContext';
import { useNavigate } from 'react-router-dom';

const Yourorders = () => {
  const API_URL = process.env.REACT_APP_BASE_URL
  const { orderid, setOrderid } = useContext(OpulxContext)
  const navigate = useNavigate()

  const [viewTable, setViewTable] = useState(false)
  const [userOrders, setUserOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [snkMsg, setSnkMsg] = useState(false)

  const [orderToCancel, setOrderToCancel] = useState()

  // fetch user orders
  const fetchOrders = async () => {
    try {
      setLoading(true)
      setOpenSnack(true)
      const id = localStorage.getItem("userid-opulx")
      const token = localStorage.getItem("usertoken-opulx")

      const response = await axios.get(`${API_URL}/api/order/fetch-individual-order/${id}`, {
        headers: {
          token: token
        }
      })
      console.log(response.data)
      setSnkMsg(response.data?.message)
      setUserOrders(response.data?.orders)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      setOpenSnack(true)
      console.log(error)
      setSnkMsg(error.response?.data?.message)
      setLoading(false)
    }
  }

  const cancelOrder = async() => {
    try {
      setLoading(true);
      const token = localStorage.getItem("usertoken-opulx")
      const data = {
        status : "cancelled"
      }
      const response = await axios.put(`${API_URL}/api/order/cancel-order/${orderToCancel}`, data, {
        headers: {
          token: token
        }
      })
      console.log(response.data)
      setLoading(false);
      setOpenSnack(true);
      setSnkMsg(response.data?.message);
      fetchOrders()
    } catch (error) {
      setLoading(true);
      console.log(error)
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchOrders()
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
      <div id="order-panel" style={{fontFamily: 'Montserrat'}} className='m-4'>
        <div id="format-heading" className='flex justify-between my-3'>
          <h2 className='text-xl'>Your Orders</h2>
          {
            viewTable ? (
              <button onClick={()=>{setViewTable(!viewTable)}}><BsTable size={15}/></button>
            ) : (
              <button onClick={()=>{setViewTable(!viewTable)}}><BsCardList size={15}/></button>
            )
          }
        </div>
        <div id="table">
          {
            viewTable ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order name</TableCell>
                      <TableCell>Order Id</TableCell>
                      <TableCell>Order Status</TableCell>
                      <TableCell>Order Value</TableCell>
                      <TableCell>Order Actions</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (userOrders && (userOrders.length > 0)) ? (
                        userOrders.map((item, index) => (
                          <TableRow key={index}>
                              <TableCell>{item.address?.name}</TableCell>
                              <TableCell>{item._id}</TableCell>
                              <TableCell >
                                <span className={`py-1 px-3 rounded-full ${(item.status === "cancelled") ? ("bg-red-500") : (item.status === "pending") ? ("bg-yellow-500") : ("bg-green-500")} text-white`}>
                                  {item.status}
                                </span>
                              </TableCell>
                              <TableCell>₹{item.totalPrice}</TableCell>
                              <TableCell >
                                {
                                  (item.status === "cancelled" || item.status === "delivered") ? ("") : (
                                    <button className='text-sm py-1 px-3 rounded bg-red-500 text-white' onClick={() => {setOrderToCancel(item._id); cancelOrder()}}>cancel order</button>
                                  )
                                }
                              </TableCell>
                          </TableRow>
                        ))
                      ) : ("")
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className='md:grid grid-cols-3'>
                {
                  userOrders.map((item, index) => (
                    <div id="order-cards" key={index} className='my-2 mx-2 p-2 rounded shadow' >
                      <div id="name" className='text-xl my-1'>
                        {item.address?.name}
                      </div>
                      <div id="oid" className='text-sm my-1'>
                        <span className='font-semibold'>Order_id: </span>{item._id}
                      </div>
                      <div id="orderprice" className='text-sm my-1'>
                        <span className='font-semibold'>Order_value: </span>₹{item.totalPrice}
                      </div>
                      <div id="ostatus" className='text-sm my-2'>
                      <span className={`${(item.status === "cancelled") ? ("bg-red-500") : (item.status === "pending") ? ("bg-yellow-500") : ("bg-green-500")} text-white py-1 px-3 rounded-full`}>{item.status}</span>
                      </div>
                      <div id="cancelbutton">
                        {
                          (item.status === "cancelled" || item.status === "delivered") ? ("") : (
                            <button className='py-1 px-3 rounded bg-red-500 text-white' onClick={() => {setOrderToCancel(item._id); cancelOrder()}}>Cancel Order</button>
                          )
                        }
                      </div>
                      <span className='text-sm underline text-gray-400' onClick={() => {setOrderid(item._id); navigate(`/order/:${orderid}`);}}>View Details</span>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Yourorders