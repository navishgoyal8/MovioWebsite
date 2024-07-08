import React from 'react'
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {

  const trendingData = useSelector(state => state.movioData.bannerData);
 
  const {data: nowPlayingData} = useFetch('/movie/now_playing')
  const {data: topRatedData} = useFetch('/movie/top_rated')
  const {data: popularData} = useFetch('/tv/popular')
  const {data: onAirData} = useFetch('/tv/on_the_air')

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading='Trending Show' trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading='Now Playing Movies' trending={false} media_type={"movie"} />
      <HorizontalScrollCard data={topRatedData} heading='Top Rated Movies' trending={false} media_type={"movie"}/>
      <HorizontalScrollCard data={popularData} heading='Popular Shows' trending={false} media_type={"tv"} />
      <HorizontalScrollCard data={onAirData} heading='On Air Shows' trending={false} media_type={"tv"} />
    </div>
  )
}

export default Home
