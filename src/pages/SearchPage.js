import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

const SearchPage = () => {

  const [data,setData] = useState([])
  const [pageNo,setPageNo] = useState(1)
  const location = useLocation()
  const navigate = useNavigate()

  const query = location?.search?.slice(3)

  const fetchData = async() => {
    try{
      const response = await axios.get(`/search/multi`,
        {
          params: {
            query: location?.search?.slice(3),
            page: pageNo
          }
        }
      )
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })
    }
    catch(error){
      console.log("error",error)
    }
  }



  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      setPageNo((prev) => prev + 1)
    }
  }

  useEffect(() => {

    if(query){
      setPageNo(1)
      setData([])
      fetchData()
    }

  },[location?.search])

  useEffect(() => {

    if(query){
      fetchData()
    }
    
  },[pageNo])

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  return (
    <div className='py-16'>
    <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
      <input className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900' type="text" placeholder='Search here...' value={query?.split("%20")?.join(" ")} onChange={(e) => navigate(`/search?q=${e.target.value}`)} />
    </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Seach Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
        {
          data.map((searchData,index) => {
            return (
              <Card key={searchData.id+"searchSection"} data={searchData} media_type={searchData.media_type}/>
            )
          })
        }
        </div>
      </div> 
    </div>
  )
}

export default SearchPage
