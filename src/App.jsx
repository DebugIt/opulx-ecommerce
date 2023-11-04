import { useContext, useEffect, useState } from "react"
import React from 'react'
import OpulxContext from "../src/context/OpulxContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Commons/Navbar"
import Login from "./Pages/Login"
import Footer from "./Components/Commons/Footer"
import Dashboard from "./Pages/Dashboard"


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginactivity, setLoginActivity] = useState(false)

  useEffect(() => {
    const getStat = localStorage.getItem("opulx-admin-token")
    if(!getStat){
      setIsLoggedIn(false)
      console.log("Not logged-in")
    }else{
      setIsLoggedIn(true)
      console.log("logged-in")
    }
  }, [isLoggedIn, loginactivity])
  


  return (
    <>
      <OpulxContext.Provider value={{isLoggedIn, setIsLoggedIn, loginactivity, setLoginActivity, }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
          <Footer />
        </Router>
      </OpulxContext.Provider>
    </>
  )
}

export default App