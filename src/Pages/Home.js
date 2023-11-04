import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import OpulxContext from '../context/OpulxContext'

// icons
import { IoMdArrowDropright } from "react-icons/io"
import { CiFilter } from "react-icons/ci"

// dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// loading - progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { useNavigate } from 'react-router-dom'

const Home = () => {

  const API_URL = process.env.REACT_APP_BASE_URL
  const { individualCategory, setIndividualCategory, individualProduct, setIndividualProduct } = useContext(OpulxContext)
  const navigate = useNavigate()
  const [prodHome, setProdHome] = useState([])
  const [categories, setCategories] = useState([])

  const [showfilters, setShowFilters] = useState(false)

  // dropdown selection
  const [filterCategory, setFilterCategory] = useState()
  // loading
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const searchForCategoryProducts = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/category/fetch-category-products/${filterCategory}`);
      console.log(response.data?.products)
      setProdHome(response.data?.products)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProductsForHome = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/product/limited-products/10`)
      console.log(response.data?.data)
      setProdHome(response.data?.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/category/getall-categories`)
      console.log(response.data?.data)
      setCategories(response.data?.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchProductsForHome()
    fetchCategories()
  }, [])
  
  useEffect(() => {
    searchForCategoryProducts()
  }, [filterCategory])
  

  return (
    <>
        <div id="home-container" className='m-4'>

          <div id="filters" className='flex' onClick={() => setShowFilters(!showfilters)}>
            <h2 className='text-lg'>Filters </h2>
            <CiFilter className='pt-1' size={25}/>
          </div>

          {/* Filters */}
          {
            showfilters ? (
              <div id="filter-container" className='p-2 py-4'>
                <span className='rounded-md my-2 px-3 py-2 bg-red-500 text-white ' onClick={() => {fetchProductsForHome(); setFilterCategory(""); setShowFilters(!showfilters)}}>Reset Filters</span>

                <div id="filter-by-category" className='my-8'>
                  <p className='text-green-800'>*Select your desired category</p>
                  <FormControl sx={{ minWidth: 200, my:2 }} size="small">
                    <InputLabel id="demo-select-small-label">Select Category</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filterCategory}
                      label="Filter By Category"
                      onChange={handleChange}
                    >
                      {
                        categories.map((item, index) => (
                          <MenuItem key={index} value={item.slug}>{item.name}</MenuItem>
                        ))
                      }
                    </Select>
                </FormControl>
                </div>
              </div>
            ) : ("")
          }


          {
            loading ? (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="inherit" />
              </Stack>
            ) : (
              <div id="range-of-prod">
                <p className='font-semibold my-4 text-xl'>Our Range of Products</p>
                <div id="top-products" className='grid grid-cols-2 md:grid-cols-5' style={{fontFamily: 'Montserrat'}}>
                  {
                    prodHome.map((item, index) => (
                      <Card key={index} pname={item.name} imgUrl={item.photo} desc={item.description} price={item.price} slug={item.slug}/>
                    ))
                  }
                </div>
              </div>
            )
          }
          
          {/*  */}
            <div id="categories">
              <p className='font-semibold my-4 text-xl'>Our Available Categories</p>
              <div id="top-products" className='grid' style={{fontFamily: 'Montserrat'}}>
                {
                  categories.map((item, index) => (
                    <div key={index} id="individual" onClick={() => {setIndividualCategory(`${item.slug}`); navigate(`/category/:${item.slug}`)}} className='flex justify-between outline-none border-b my-1 p-2 hover:bg-[#f9f6ea] ease-in-out duration-500'>
                        <p>
                          {item.name}
                        </p>
                        <IoMdArrowDropright size={25}/>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    </>
  )
}

export default Home