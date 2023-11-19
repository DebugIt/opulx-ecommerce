import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom"
import OpulxContext from "./context/OpulxContext";
import Home from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Footer from "./Components/common/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Yourorders from "./Pages/Yourorders";
import IndividualCategory from "./Pages/IndividualCategory";
import IndividualProduct from "./Pages/IndividualProduct";
import Createorder from "./Pages/Createorder";



// snackbars
import Snackbar from '@mui/material/Snackbar';
import Notfound from "./Pages/Notfound";
import IndividualOrder from "./Pages/IndividualOrder";

function App() {

  // track user log
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginactivity, setLoginActivity] = useState(false)
  
  
  const [individualCategory, setIndividualCategory] = useState()
  const [individualProduct, setIndividualProduct] = useState()

  // for passing the product id to gain product info
  const [individualProductId, setIndividualProductId] = useState()

  

  useEffect(() => {
    const getStat = localStorage.getItem("userlogstatus-opulx")
    if(!getStat){
      setIsLoggedIn(false)
      console.log("Not logged-in")
    }else{
      setIsLoggedIn(true)
      console.log("logged-in")
    }

     
    // Retrieve the cart data from local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [loginactivity])
  

  // cart
  const [cart, setCart] = useState(() => {
    // Try to retrieve the cart data from local storage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartAlert, setCartAlert] = useState(false)
  const [cartMessage, setCartMessage] = useState("")
  

  const addToCart = (item, quantity) => {
    const newObj = {
      name: item.name,
      quantity,
      price: item.price,
      imageURLs: [item.photo]
    }
    const searchForDuplicate = cart.find((itemname) => itemname.name === item.name)
    if(searchForDuplicate){
      console.log("cannot add")
      setCartAlert(!cartAlert)
      setCartMessage("Product already in cart")
      
    }
    else{
      if(cart.length === 0){
        setCart([newObj]);
        setCartAlert(!cartAlert)
        setCartMessage("Product Added to Cart")
        
      }
      else{
        setCart([...cart, newObj])
        setCartAlert(!cartAlert)
        setCartMessage("Product Added to Cart")
      }
    }   
    
  }

  // Function to remove an item from the cart
  const removeFromCart = (itemName) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== itemName);
    setCart(updatedCart);
  };

  useEffect(() => {
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])
  
  
  // individual orders
  const [orderid, setOrderid] = useState();


  return (
    <>
    
    
    <OpulxContext.Provider 
    value={{ individualCategory, setIndividualCategory, individualProduct, setIndividualProduct, isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity,
    // cart stuff
    cart, setCart,addToCart, removeFromCart, orderid, setOrderid, cartMessage, setCartMessage, cartAlert, setCartAlert
    }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/yourorders" element={<Yourorders />}/>
          <Route path="/category/:category_slug" element={<IndividualCategory />}/>
          <Route path="/product/:product_slug" element={<IndividualProduct />}/>
          <Route path="/placeorder" element={<Createorder />}/>
          <Route path="/order/:order" element={<IndividualOrder />}/>
          <Route path="*" element={<Notfound />}/>
          {/* TODO: 404 pge */}
        </Routes>
        <Footer />
      </Router>
    </OpulxContext.Provider>
    </>
  );
}

export default App;
