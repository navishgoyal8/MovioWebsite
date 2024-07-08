import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetchDetails = (endpoint) => {

    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);

    const fetchData = async() => {
        try{
            setLoading(true);
            const response = await axios.get(endpoint);
            setData(response.data);
            setLoading(false);
        }
        catch(error){
            console.log("error",error)
        }
    }

    useEffect(() => {
        fetchData();
    },[])

  return {data,loading}
}

export default useFetchDetails
