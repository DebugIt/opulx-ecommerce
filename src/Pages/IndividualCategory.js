import React, { useContext, useEffect, useState } from 'react'
import OpulxContext from '../context/OpulxContext'
import axios from 'axios'
import Card from '../Components/Card'

// loading - progress
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// carousel
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useParams } from 'react-router-dom';


const IndividualCategory = () => {
    let { category_slug } = useParams()

    const API_URL = process.env.REACT_APP_BASE_URL
    // context
    const { individualCategory, setIndividualCategory } = useContext(OpulxContext)
    const [individualCats, setIndividualCats] = useState([])
    const [carousel, setCarousel] = useState([])
    // loading
    const [loading, setLoading] = useState(false)

    const searchForCategoryProducts = async() => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/category/fetch-category-products/${category_slug}`);
        console.log(response.data?.products)
        setIndividualCats(response.data?.products)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    const [banner, setBanner] = useState()
    const fetchBanners = async() => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/banner/getbanner_home`)
        console.log("banner:",response.data?.banners[0])
        setCarousel(response.data?.banners)
        if(carousel.length > 1){

        }else{
          if(carousel.length > 4)
            setBanner(response.data?.banners[2].imageUrl)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      searchForCategoryProducts()
    }, [individualCategory])
    

    useEffect(() => {
      fetchBanners()
    }, [])
    

  return (
    <>
      <div id="category-container" className='m-4' style={{fontFamily: 'Montserrat'}}>
        <div id="homebanner" className='mb-5 md:h-[70vh] '>     
          {
              (carousel.length > 0) ? (
                <Carousel className='h-full' > 
                  {
                    carousel.map((item, i) => (
                      <Paper>
                        <img className='h-full w-full object-cover' key={i} src={item.imageUrl} alt="" />
                      </Paper>
                    ))
                  }                    
                </Carousel>
                ) : (
                  <img className='h-full w-full object-cover' src={banner} alt="" /> 
                )
          }
        </div>
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