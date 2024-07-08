import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const BannerHome = () => {

  const data = useSelector(state => state.movioData.bannerData);
  const imageURL = useSelector(state => state.movioData.imageURL);
  const [currentImage,setCurrentImage] = useState(10);
  console.log("bannerHoem",data)

  const handleNext = () => {
      if(currentImage < data.length-1){
        setCurrentImage(prev => prev+1)
      }
  }

  const handlePrev = () => {
    if(currentImage > 0){
      setCurrentImage(prev => prev-1)
    }
  }

  useEffect(() => {
    const interval = setInterval(()=>{
      if(currentImage < data.length-1){
        setCurrentImage(prev => prev+1)
      }
      else{
        setCurrentImage(0)
      }
    },5000)

    return () => clearInterval(interval)
  },[data,imageURL,currentImage])

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {
          data.map((movie,index) => {
            return(
              <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage*100}%)`}}>
                  <div className='w-full h-full'>
                    <img src={imageURL+movie.backdrop_path} alt="movieImage" className='h-full w-full object-cover'/>
                  </div>
                  <div className='absolute hidden top-0 w-full h-full items-center justify-between px-4 group-hover:lg:flex'>
                    <button onClick={handlePrev} className='bg-white p-1 rounded-full text-xl text-black z-10'>
                      <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl text-black z-10'>
                      <FaAngleRight />
                    </button>
                  </div>
                  <div className='absolute h-full w-full top-0 bg-gradient-to-t from-neutral-900 to-transparent'></div>
                  <div className='container ml-10 mx-auto'>
                    <div className='w-full bottom-0 max-w-md absolute px-3'>
                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{movie?.title || movie?.name}</h2>
                    <p className='text-ellipsis line-clamp-3 my-2'>{movie.overview}</p>
                    <div className='flex items-center gap-4'>
                    <p>Rating : {Number(movie.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(movie.popularity).toFixed(0)}</p>
                  </div>
                  <Link to={"/"+movie?.media_type+"/"+movie.id} >
                    <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                    Play Now
                  </button>
                  </Link>
                  
                  </div>
              </div>
                  </div>
                  
            )
          })
        }
      </div>
    </section>
  )
}

export default BannerHome
