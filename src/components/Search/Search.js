import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import TvCard from '../Card/TvCard';
import { MdMovieCreation } from "react-icons/md";  // icon  <MdMovieCreation />
import { IoHome } from "react-icons/io5";  //<IoHome />
import { PiTelevision } from "react-icons/pi"; //<PiTelevision />
import { FaRegBookmark } from "react-icons/fa"; //<FaRegBookmark/>
import { MdLocalMovies } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";

const apiKey = process.env.API_KEY || "8170440d983c7c26f7238eed689fe9fc"



function Search(){
    const naviagte = useNavigate();
  const {id,searchItem} = useParams()
  const [movieData , setMovieData] = useState(null)
  const [homeData , setHomeData] = useState(null)
  const [tvData , setTvData] = useState(null)


  useEffect(()=>{
    if(id === "HomePage"){
        const fetchData = async () => {
    
            // Function to mix movies and TV series in a single array
         const mixData = (movies, tvSeries) => {
           const mixedData = [];
       
           for (let i = 0; i < Math.max(movies.length, tvSeries.length); i++) {
             if (i < movies.length) {
               mixedData.push( movies[i] );
             }
             if (i < tvSeries.length) {
               mixedData.push( tvSeries[i] );
             }
           }
           return mixedData;
         };
             // Function to get a random subset of an array
         const getRandomSubset = (array, size) => {
           const shuffled = array.sort(() => 0.5 - Math.random());
           return shuffled.slice(0, size);
         };
       
           try {
                    // Fetch trending movies
                    const trendingMoviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchItem}`;
                    const trendingMoviesResponse = await fetch(trendingMoviesEndpoint);
                    const trendingMoviesData = await trendingMoviesResponse.json();
                    
                    // Fetch trending TV series
                    const trendingTvSeriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchItem}`;
                    const trendingTvSeriesResponse = await fetch(trendingTvSeriesEndpoint);
                    const trendingTvSeriesData = await trendingTvSeriesResponse.json();
                    
                     // Combine movies and TV series in a single array
                   const combinedData = mixData(trendingMoviesData.results, trendingTvSeriesData.results);
                   
            
                    // Randomly select a subset of combined data
                    const randomTrendingData = getRandomSubset(combinedData, 20);
                    setHomeData(randomTrendingData)
                    
           } catch (error) {
              //  console.error('Error fetching data:', error);
           }
          };
    
          fetchData();
    }else if(id === "MoviePage"){
              const fetchMovieData = async()=>{
                       // Fetch trending movies
                       const searchMoviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchItem}`;
                       const searchMoviesResponse = await fetch(searchMoviesEndpoint);
                       const searchMoviesData = await searchMoviesResponse.json();
                       
                       setMovieData(searchMoviesData)
              }
              fetchMovieData()
    }else if(id === "TvPage"){
        const fetchTvData = async()=>{
             // Fetch trending TV series
             const TvSeriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchItem}`;
             const TvSeriesResponse = await fetch(TvSeriesEndpoint);
             const TvSeriesData = await TvSeriesResponse.json();
             setTvData(TvSeriesData)
        }
        fetchTvData()
    }
    

    
  },[id,searchItem])
  
   let Homedata = "";
  Homedata = (homeData)?
  homeData.slice(0,16).map((homedata,index) => (
   <TvCard key={index} data={homedata}/>
 )):null

  let renderMovies = "";
  renderMovies = (movieData)?
 movieData.results.slice(0,16).map((movie) => (
   <TvCard key={movie.id} data={movie}/>
 )):null
  
 let rendertv = "";
 rendertv = (tvData)?
 tvData.results.slice(0,16).map((tv) => (
  <TvCard key={tv.id} data={tv}/>
)):null


   function navi(){
    // const {id} = useParams()
    if(id === "MoviePage"){
        naviagte("/movies")
    }else if(id==="TvPage"){
        naviagte("/tvseries")
    }else{
        naviagte("/home")
    }
   }
    return(
        <div class="flex flex-col lg:flex-row bg-slate-900 overflow-y-auto">
        {/* left bar */}
            <div class=" w-full lg:w-1/12 bg-slate-900  lg:h-screen ">
              {/* nav bar */}
              <div className=" flex justify-center items-center w-full  lg:w-auto fixed  lg:ml-3 xl:ml-6 ">
              <div className="bg-slate-900 lg:bg-slate-800 w-full flex lg:block pt-6 md:pt-12 lg:pt-0 h-20  lg:h-screen lg:w-16 xl:w-20 lg:rounded-xl text-center lg:py-4 text-xl ">
              <div className="text-red-600 hover:text-red-400 flex justify-center pl-6 md:pl-10 lg:pl-6 px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 text-2xl cursor-pointer"><button onClick={()=>{naviagte("/home");}}><MdMovieCreation /></button></div>
              <div className="text-gray-400 hover:text-white  flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/home");}}><IoHome /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/movies");}}><MdLocalMovies /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/tvseries");}}><PiTelevision /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/bookmarks");}}><FaRegBookmark/></button></div>
             {/* user logo */}
             <div className="flex justify-center items-center lg:items-none px-12 lg:px-0 lg:h-screen md:w-full lg:w-auto md:float-right lg:float-none md:ml-64 lg:ml-0 lg:mr-8 xl:mr-12"><button onClick={()=>{naviagte("/userinfo");}}>
              <div className=" bg-white w-6 md:w-8 lg:w-8 xl:w-12 h-6 md:h-8 lg:h-8 xl:h-12 rounded-full  cursor-pointer lg:absolute lg:bottom-12 "></div></button>
              </div>
              </div>
              </div>
              {/* nav bar end */}
            </div>
            {/* right bar */}
           <div class="w-full lg:w-11/12  h-screen ">
            {/* vertical grid */}
           
                 <div class=" bg-slate-900 mt-16 pt-6 md:pt-0 md:mt-28 lg:mt-8 xl:mt-8">
                  {/* trending card */}
                  <div className="flex ">
                    <button onClick={navi}  className="text-white text-2xl ml-4"><IoArrowBackSharp /></button>
                  <div className='text-white text-2xl ml-5 md:pl-2 lg:pl-0'>Search</div>
                  </div>
                  <div className='flex  flex-wrap text-white justify-between'>
                    {
                        (id==="HomePage")?(<div className="flex flex-wrap flext-start">{Homedata}</div>):(id==="MoviePage")?(<div className="flex flex-wrap flext-start">{renderMovies}</div>):(id==="TvPage")?(<div className="flex flex-wrap flext-start">{rendertv}</div>):null
                    }
                  </div>
               
           </div>
           </div>
      </div>
    )
}

export default Search

