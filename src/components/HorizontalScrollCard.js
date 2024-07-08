import React,{useRef} from 'react'
import Card from './Card'
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({data=[],heading,trending,media_type}) => {

    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 300;
    }

     const handlePrev = () => {
        containerRef.current.scrollLeft -= 300;
    }

  return (
        <div className='container mx-auto px-3 my-10'>
      <h2 className='text-xl lg:text-2xl font-bold mb-2 text-white capitalize'>{heading}</h2>
      <div className='relative'>
        <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-5 overflow-hidden overflow-x-scroll     relative z-10 scroll-smooth transition-all scrolbar-none'>
         {
      data.map((dat,index) => {
        return (
          <Card key={dat.id} data={dat} trending={trending} index={index+1} media_type={media_type}/>
        )
      })
    }
      </div>
        <div className='absolute top-0 hiddeb lg:flex justify-between w-full items-center h-full'>
            <button onClick={handlePrev} className='bg-white p-1 rounded-full text-xl text-black z-10'>
                <FaAngleLeft />
            </button>
            <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl text-black z-10'>
                <FaAngleRight />
            </button>
        </div>
      </div>
      
     

    </div>
  )
}

export default HorizontalScrollCard
