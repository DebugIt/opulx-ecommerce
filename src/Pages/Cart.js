import React, { useContext, useEffect, useState } from 'react';
import OpulxContext from '../context/OpulxContext';
import { useNavigate } from 'react-router-dom';


// signin modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

// progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// snackbars
import Snackbar from '@mui/material/Snackbar';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BASE_URL
  const { cart, setCart, removeFromCart, isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity } = useContext(OpulxContext);
  let total;

  const [cartValue, setCartValue] = useState(0);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // snackbar
  const [openErr, setOpenErr] = useState(false);
  const [msg, setMsg] = useState("");


  const handleLogin = async() => {
    if(email === "" || password === ""){
        // setOpenErr(!openErr);
        // setMsg("All Fields Required")
        alert("All Fields required")
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
        navigate("/placeorder")
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


  const calculateTotal = () => {
    total = 0;
    cart.map((item) => (total = item.price * item.quantity + total));
    setCartValue(total);
  };

  const navigatetoPlace = async () => {
    if (isLoggedIn) {
      navigate('/placeorder');
    } else {
      handleOpen()
    }
  };

  const handleQuantityChange = (itemName, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.name === itemName) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
  };

  useEffect(() => {
    console.log(cart);
    calculateTotal();
    console.log(total);
  }, [cart]);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                <p className='my-3 text-xl font-semibold'>Please login to continue</p>
                <p className='my-3 text-3xl font-semibold'>Login</p>
                <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className={`border-b w-full my-2 p-2 outline-none ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>Don't have an account? <span className='underline underline-offset-2 cursor-pointer' onClick={() => navigate("/signup")}>Join us today!</span></p>
                <button className={`font-semibold my-3 py-2 bg-[#f9f6e5] hover:bg-[#dad1a1] transition ease-in-out duration-500 ${loading ? ("cursor-not-allowed") : ("")}`} disabled={loading} onClick={handleLogin}>Login</button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      {cart.length === 0 ? (
        <div id="cart-container" className="m-2" style={{ fontFamily: 'Montserrat' }}>
          <h1>Your Shopping Cart is Empty :: Try adding products to the cart</h1>
        </div>
      ) : (
        <div>
          <div
            id="cart-container"
            className="m-2 text-sm grid grid-cols-2 md:grid-cols-6"
            style={{ fontFamily: 'Montserrat' }}
          >
            {cart.map((item) => (
              <div key={item.name} className="product p-2 shadow-md">
                <div id="imagepreview">
                  <img src={item.imageURLs[0]} alt={item.name} />
                </div>
                <h2>
                  <span className="font-semibold">Product:</span> {item.name}
                </h2>
                <h3>
                  <span className="font-semibold">Price x Quantity:</span> {item.price} x{' '}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                  />
                </h3>
                <h3>
                  <span className="font-semibold">Subtotal:</span> ₹{item.price * item.quantity}
                </h3>
                <button
                  className="rounded-full text-white text-sm my-1 py-1 px-3 bg-red-700"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="font-semibold my-2 py-2 bg-[#f3ecca] w-full"
            onClick={() => {
              navigatetoPlace();
            }}
          >
            Cart Total: ₹{cartValue}/-
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
