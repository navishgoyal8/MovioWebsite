import React from 'react'
import {IoClose} from 'react-icons/io5'
import useFetchDetails from '../hooks/useFetchDetails'
import { useParams } from 'react-router-dom'

const VideoPlay = ({data,close,media_type}) => {
    
    const {data: videoData} = useFetchDetails(`${media_type}/${data}/videos`)

  return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
        <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
            <button className='absolute -right-1 -top-6 text-3xl z-50'>
                <IoClose onClick={close} />
            </button>

            <iframe className='w-full h-full' src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </section>
  )
}

export default VideoPlay
