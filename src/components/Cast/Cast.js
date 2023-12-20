import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaImdb } from "react-icons/fa";
import { GoLink } from "react-icons/go";


function Cast(){

    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
  const apiKey = "8170440d983c7c26f7238eed689fe9fc"

  useEffect(() => {
    // fetch movie
    const fetchMovieDetails = async () => {
      try {
        const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const response = await fetch(movieDetailsEndpoint);
        const data = await response.json();

        // Set the fetched movie details in the state
        setMovieDetails(data);
      } catch (error) {
        // console.error('Error fetching movie details:', error);
      }
    };


    // Fetch movie details when the component mounts
    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }
  


    return(
      <div>
         <div class="block lg:flex mb-4 h-screen ">
          {/* img div */}
               <div class="w-full  lg:w-1/3 bg-slate-800 p-8 ">
                <div className='flex justify-center '>
                  <img src={`https://image.tmdb.org/t/p/w500${(movieDetails.poster_path)}`} className='rounded md:w-1/2 lg:w-auto'/>
                </div>
               </div>
               {/* details div */}
               <div class="w-full lg:w-2/3 bg-slate-800 p-7"><div className='text-3xl md:text-4xl text-white'>{(movieDetails.title)} : {movieDetails.tagline}</div>
                  <div className='flex mt-4 font-bold'>
                  <div className='text-gray-400 text-xl mt-2'>Imdb Rating  </div>
                  <div className='text-white text-xl mt-2 ml-4'>{movieDetails.vote_average}/10</div>
                  </div>
                  {/* length line */}
                  <div className='flex text-white font-bold justify-between w-full md:w-3/4 mt-6 mb-4'>
                      <div> <div className='text-gray-400'>Length</div> <div>{movieDetails.runtime} min.</div>
                      </div>
                      <div> <div className='text-gray-400'> Language</div> <div>{movieDetails.original_language}</div></div>
                      <div> <div className='text-gray-400'>Year</div> <div>{movieDetails.release_date.substring(0, 4)}</div></div>
                      <div> <div className='text-gray-400'>Status</div> <div>{movieDetails.status}</div></div>
                  </div>
                  {/* generes */}
                  <div className='text-gray-200 font-bold pt-4 mb-2 text-lg '>Genres</div>
                  <div className=''>
                    <div className='md:space-x-4  flex flex-wrap w-full justify-between md:justify-normal'>{movieDetails.genres.map((item)=>(<span className='text-black bg-gray-200 text-center rounded px-2 font-bold  mb-2'>{item.name}</span>))}</div>
                  </div>
                  {/* synopsis */}
                  <div className='pt-4 mt-6'>
                  <div className='font-bold text-gray-300 mb-2 md:mb-0 text-lg '>Synopsis</div>
                  <div className='font-bold text-gray-400 mt-2'>{movieDetails.overview}</div>
                  </div>
                  {/* butttons md:w-1/2 */}
                  <div  className='flex justify-between pt-8 w-3/4 md:w-1/3 lg:w-2/5 text-center items-center mt-2 md:mt-6 '>
                    <button className='bg-slate-500 p-4  w-32 lg:w-32 rounded text-white font-bold text-center items-center flex justify-between h-10 mr-4' >website<GoLink class="stroke-2"/></button>
                    <button className='bg-slate-500 p-4 w-32 rounded text-white font-bold text-center items-center flex justify-between h-10' >IMDB<FaImdb class="stroke- "/></button>
                  </div>
               </div>
         </div>
      </div>
    )
}

export default Cast 