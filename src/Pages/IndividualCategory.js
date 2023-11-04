import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import axios from 'axios'
import Card from '../Components/Card'

// loading - progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const IndividualCategory = () => {
    const API_URL = process.env.REACT_APP_BASE_URL
    // context
    const { individualCategory, setIndividualCategory } = useContext(OpulxContext)
    const [individualCats, setIndividualCats] = useState([])
    // loading
    const [loading, setLoading] = useState(false)

    const searchForCategoryProducts = async() => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/category/fetch-category-products/${individualCategory}`);
        console.log(response.data?.products)
        setIndividualCats(response.data?.products)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      searchForCategoryProducts()
    }, [individualCategory])
    


  return (
    <>
      <div id="category-container" className='m-4' style={{fontFamily: 'Montserrat'}}>
        <h2 className='font-semibold my-4 text-xl'>Results for {individualCategory}</h2>
          {
            loading ? (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="inherit" />
              </Stack>
            ) : (
              <div id="top-products" className='grid grid-cols-2 md:grid-cols-5' style={{fontFamily: 'Montserrat'}}>
                {
                  individualCats.map((item, index) => (
                    <Card key={index} pname={item.name} imgUrl={item.photo} desc={item.description} price={item.price}/>
                  ))
                }
              </div>
            )
          }
      </div>
    </>
  )
}

export default IndividualCategory