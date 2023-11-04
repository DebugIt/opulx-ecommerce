import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
// icons
import { CiMenuFries } from "react-icons/ci"


// Drawer
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import OpulxContext from '../../context/OpulxContext';



const Navbar = () => {
    // context
    const { individualCategory, setIndividualCategory, isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity } = useContext(OpulxContext)
    const API_URL = process.env.REACT_APP_BASE_URL
    // drawer
    const [state, setState] = useState({
        right: false,
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/category/getall-categories`)
        console.log(response.data?.data)
        setCategories(response.data?.data)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(() => {
      fetchCategories()
    }, [])
    




    // const toggleDrawer = (anchor, open) => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //       return;
    //     }
    
    //     setState({ ...state, [anchor]: open });
    // };
    const toggleDrawer = (open) => () => {
      setIsDrawerOpen(open);
    };
    
    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List className='flex justify-between '>
            <p className='px-3 py-2 text-3xl  text-[#314114]' style={{fontFamily: 'Sacramento'}}>Opulx</p>
            <p className='px-3 py-2 text-2xl  text-[#314114]' style={{fontFamily: 'Playfair Display'}}>O</p>
          </List>
          <Divider />
          
          <List sx={{padding:2}} style={{fontFamily: 'Montserrat'}}>
            <p className='text-xl font-semibold'>Categories</p>
            {
              categories.map((item, index)=>(
                
                // <ListItem key={index} className='cursor-pointer' onClick={() => {setIndividualCategory(`${item.slug}`); navigate(`/category/:${item.slug}`)}}>{item.name}</ListItem>
                <ListItem
                  key={index}
                  className='cursor-pointer'
                  onClick={() => {
                    setIndividualCategory(`${item.slug}`);
                    navigate(`/category/:${item.slug}`);
                    toggleDrawer(false); // Close the drawer
                  }}
                >
                  {item.name}
                </ListItem>
              ))
            }
          </List>
          <Divider />

          <List sx={{padding:2}} style={{fontFamily: 'Montserrat'}}>
            <ListItem className='cursor-pointer' onClick={() => {navigate("/"); toggleDrawer('right', false);}}> Home </ListItem>
            <ListItem className='cursor-pointer' onClick={() => {navigate("/cart")}}> Cart </ListItem>
            <ListItem className='cursor-pointer' onClick={() => {navigate("/profile")}}> Profile </ListItem>
            <ListItem className='cursor-pointer' onClick={() => {navigate("/yourorders")}}> Your Orders </ListItem>
          </List>
          <Divider />

          {
            ( isLoggedIn === true ) ? (
              <>
                <List >
                  <ListItem sx={{display:"flex", justifyContent:"center"}}>
                      <button className='mx-1 px-8 py-2 rounded-md font-semibold hover:bg-[#f9f6e5] transition ease-in-out duration-500' onClick={() => {localStorage.removeItem("userlogstatus-opulx"); localStorage.removeItem("userid-opulx"); localStorage.removeItem("usertoken-opulx"); navigate("/login"); setLoginActivity(false)}}>Logout</button>
                  </ListItem>
                </List>
                <Divider />
              </>
            ) : (
              <>
                <List >
                  <ListItem sx={{display:"flex", justifyContent:"center"}}>
                      <button className='mx-1 px-8 py-2 rounded-md font-semibold hover:bg-[#f9f6e5] transition ease-in-out duration-500' onClick={() => navigate("/login")}>Login</button>
                      <button className='mx-1 px-8 py-2 rounded-md font-semibold hover:bg-[#f9f6e5] transition ease-in-out duration-500' onClick={() => navigate("/signup")}>Signup</button>
                  </ListItem>
                </List>
                <Divider />
              </>
            )
          }
        </Box>
    );

  return (
    <>  
    {/* drawer */}
        <div>
            {
                <React.Fragment key={"right"}>
                <Drawer
                  anchor={"right"}
                  open={isDrawerOpen}
                  onClose={toggleDrawer(false)}
                >
                    {list("right")}
                </Drawer>
                </React.Fragment>
            }
        </div>

        <div id="nav-container" className=' flex justify-between
        p-4 bg-[#f9f6e5] text-4xl text-[#314114] font-semibold
        ' style={{fontFamily: 'Sacramento'}} >
            <p className='tracking-wider' onClick={() => navigate("/")}>
                Opulx
            </p>
            <div id="menu-bar" className='p-1'>
                <CiMenuFries  onClick={toggleDrawer("right", true)} size={25}/>
            </div>
        </div>
    </>
  )
}

export default Navbar