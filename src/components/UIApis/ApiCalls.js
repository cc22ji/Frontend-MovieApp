import React, { useEffect } from 'react';
import { addMovies, addTvSeries,addPopularData} from '../../redux/slice/MovieSlice';
import {useDispatch} from "react-redux"


const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com"
const MovieUrl =  `${backendUrl}/api/g1/moviedata`
const TvDataUrl = `${backendUrl}/api/g1/tvdata`
const HomeDataUrl =`${backendUrl}/api/g1/populardata`

function ApiCall(){                                               
    const dispatch = useDispatch();


    useEffect(() => {
       
        const fetching = async()=>{
            try {
                const res1 = await fetch(HomeDataUrl);
                const data1 = await res1.json();
                dispatch(addPopularData(data1))

                const res2 = await fetch(MovieUrl);
                const data2 = await res2.json();
                dispatch(addMovies(data2))

                const res3 = await fetch(TvDataUrl);
                const data3 = await res3.json();
                dispatch(addTvSeries(data3))
                
            } catch (error) {
                // console.log('Fetching data error.');
            }
        }
        fetching()
    },[])

    
}

export default ApiCall