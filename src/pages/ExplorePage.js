import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

const ExplorePage = () => {

  const params = useParams()
  const [pageNo,setPageNo] = useState(1)
  const [data,setData] = useState([])
  const [totalPageNo,setTotalPageNo] = useState(0)
  
  const fetchData = async() => {
    try{
      const response = await axios.get(`/discover/${params.explore}`,{
        params: {
          page: pageNo
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })

      setTotalPageNo(response.data.total_pages)
    }
    catch(error){
      console.log("error",error)
    }
  }

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      if(pageNo < totalPageNo){
        setPageNo((prev) => prev + 1)
      }
    }
  }

  useEffect(() => {
    fetchData();
  },[pageNo])

  useEffect(() => {
    setData([])
    setPageNo(1)
    fetchData()
  },[params.explore])

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  return (
    <div className='py-16'>
      <div className='container ml-7'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore}</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
        {
          data.map((exploreData,index) => {
            return (
              <Card key={exploreData.id+"exploreSection"} data={exploreData} media_type={params.explore}/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
