import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from '../hooks/useFetch'
import VideoPlay from '../components/VideoPlay'

const DetailsPage = () => {

  const params = useParams()
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const {data: castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const {data: similarData} = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data: recommendedData} = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId,setPlayVideoId] = useState('')

  const imageURL = useSelector(state => state.movioData.imageURL)

  const duration = (Number(data?.runtime)/60).toFixed(1).split('.')
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")

  const handlePlayVideo = (data) => {
    setPlayVideoId(data?.id)
    setPlayVideo(true)
  }

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='h-full w-full'>
          <img className='h-full w-full object-cover' src={imageURL+data?.backdrop_path} />  
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
        </div>
        <div className='container ml-5 mt-2 mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
          <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
            <img className='h-80 w-60 object-cover rounded' src={imageURL+data?.poster_path} />  
            <button onClick={() => handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
          </div>
          <div>
            <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
            <p className='text-neutral-400'>{data?.tagline}</p>

            <Divider />

            <div className='flex items-center gap-3'>
              <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
              <span>|</span>
              <p>View : {Number(data?.vote_count)}</p>
              <span>|</span>
              <p>Duration : {duration[0]}h {duration[1]}m</p>
            </div>

            <Divider />

            <div>
              <h3 className='text-xl font-bold text-white mb-1'>OverView</h3>
              <p>{data?.overview}</p>

              <Divider />

              <div className='flex items-center gap-3 my-3 text-center'>
                <p>
                Status : {data?.status}
                </p>
                <span>|</span>
                <p>
                  Release Date : {moment(data?.release_date).format('MMM Do YYYY')}
                </p>
                <span>|</span>
                <p>
                  Revenue : {Number(data?.revenue)}
                </p>  
              </div>
                <Divider />
            </div>

            <div>
              <p><span className='text-white'>Director</span> : {castData?.crew[0]?.name}</p>
              <Divider />
              <p><span className='text-white'>Writer</span> : {writer}</p>
              

            </div>

            <Divider />
            <h2 className='font-bold text-lg mb-3'>Cast :</h2>
            <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
              {
                castData?.cast?.filter(el => el?.profile_path)?.map((starData,index) => {
                  return (
                    <div>
                      <div>
                        <img className='w-20 h-20 rounded-full object-cover' src={imageURL+starData?.profile_path} />
                      </div>
                      <p className='font-bold text-center text-sm text-neutral-400'>{starData?.name}</p>
                    </div>
                   
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className='ml-8'>
          <HorizontalScrollCard heading={'Similar '+params?.explore} data={similarData} media_type={params?.explore}/>
          <HorizontalScrollCard heading={'Recommended '+params?.explore} data={recommendedData} media_type={params?.explore}/>
        </div>

        {
          playVideo && (
            <VideoPlay data={playVideoId} close = {() => setPlayVideo(false)} media_type={params?.explore} />
          )
        }
      </div>
  )
}

export default DetailsPage
