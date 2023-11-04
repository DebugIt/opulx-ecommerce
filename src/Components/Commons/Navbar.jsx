import React, { useContext, useEffect } from 'react'

import { MdAdminPanelSettings } from "react-icons/md"
import OpulxContext from '../../context/OpulxContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity } = useContext(OpulxContext)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(false)
  }, [isLoggedIn === false])
  
  
  return (
    <>
        <div id="container" className='flex justify-between p-3 shadow-md' style={{fontFamily: 'Montserrat'}}>
            <div className='flex'>
                <MdAdminPanelSettings size={30}/>
                <p className='text-2xl'>Opulx Admin</p>
            </div>
            {/* FIXME: lgout must be when user is present */}
            <div className='pt-1'>
                {
                  isLoggedIn && (
                    <button onClick={() => {localStorage.removeItem("opulx-admin-token"); navigate("/"); setLoginActivity(false);}}>Logout</button>
                  )
                }
            </div>

        </div>
    </>
  )
}

export default Navbar