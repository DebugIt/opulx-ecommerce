import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CgDisplayGrid } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import { MdPendingActions } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';

const OrderController = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("opulx-admin-token");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openmsg, setOpenmsg] = useState("");

  const [id, setId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const [allOrders, setAllOrders] = useState([]);
  const [selected, setSelected] = React.useState('');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust the number of rows per page as needed

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changeStatus = async () => {
    try {
      setLoading(true);
      const data = {
        status: selected,
      };
      const response = await axios.put(`${API}/api/order/update-order-status/${id}`, data, {
        headers: {
          token: token,
        },
      });
      console.log(response.data);
      setOpen(!open);
      setOpenmsg(response.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      setLoading(false);
    }
  };

  const getDelivered = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/order/get-delivered`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data?.orders);
      setAllOrders(response.data?.orders);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      setLoading(false);
    }
  };

  const getPending = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/order/get-pending`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data?.orders);
      setAllOrders(response.data?.orders);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      setLoading(false);
    }
  };

  const getCancelled = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/order/get-cancelled`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data?.orders);
      setAllOrders(response.data?.orders);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/order/allorders`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data?.orders);
      setAllOrders(response.data?.orders);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setOpen(!open);
      setOpenmsg(error.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {loading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={openmsg}
      />
      <div id="container" className='m-4 grid py-5 border-b-2 border-black'>
        <div id="operation-panel" className='grid grid-cols-5 my-5'>
          <div className='flex justify-between'>
            <Tooltip title="Show all orders" onClick={() => getAllOrders()}>
              <IconButton>
                <CgDisplayGrid size={25} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Show delivered" onClick={() => getDelivered()}>
              <IconButton>
                <TiTick size={25} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Show pending" onClick={() => getPending()}>
              <IconButton>
                <MdPendingActions size={25} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Show cancelled" onClick={() => getCancelled()}>
              <IconButton>
                <ImCancelCircle size={25} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div id="table">
          <TableContainer className='overflow-x-scroll' component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Creation Date </TableCell>
                  <TableCell>Updation Date </TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right">UserID</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">User Email</TableCell>
                  <TableCell align="right">Order ID</TableCell>
                  <TableCell align="right">Order Status</TableCell>
                  <TableCell align="right">Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {allOrders.slice()
                .reverse() // Reverse the order of the array
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                    <TableRow
                      key={item.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                       {new Date(item.createdAt).toLocaleDateString()}
                     </TableCell>
                     <TableCell align="right">{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                     <TableCell align="right">₹{item.totalPrice}/-</TableCell>
                     <TableCell align="left">{item.user?._id}</TableCell>
                     <TableCell align="right">{item.user?.name}</TableCell>
                     <TableCell align="right">{item.user?.email}</TableCell>
                     <TableCell align="right">{item._id}</TableCell>
                     <TableCell align="right">
                       <span className={`${(item.status === "cancelled") ? ("bg-red-500") : (item.status === "pending") ? ("bg-yellow-500") : ("bg-green-500")} text-white py-1 px-3 rounded-full`}>
                         {item.status}
                       </span>
                     </TableCell>
                     <TableCell align="right">
                       <span className={`${(item.paymentstatus?.paid === "Not Paid") ? ("bg-red-500") : (item.paymentstatus?.paid === "Paid") ? ("bg-green-500") : ""} text-white py-1 px-3 rounded-full`}>
                         {item.paymentstatus?.paid}
                       </span>
                     </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div id="changeStatus">
          <p className='text-xl font-semibold my-4'>Change Order Status</p>
          <div>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='w-[50%] p-2 border-b-2 outline-none' placeholder='Enter Order Id'/>
            <FormControl sx={{ m:3, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">Select Operation</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selected}
                label="Select Status"
                onChange={(e) => setSelected(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="pending">pending</MenuItem>
                <MenuItem value="delivered">delivered</MenuItem>
                <MenuItem value="cancelled">cancelled</MenuItem>
              </Select>
            </FormControl>
            <button className='mx-2 px-3 py-2 rounded-sm outline-none hover:bg-[#121212] hover:text-white transition ease-in-out duration-500' onClick={() => changeStatus()}>Change</button>
          </div>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 40]} // Customize the available options
          component="div"
          count={allOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default OrderController;
