import Apis from '../UIApis/Apis';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import TrendingCard from '../Card/trendingCard';
import { MdMovieCreation } from "react-icons/md";  // icon  <MdMovieCreation />
import { IoHome } from "react-icons/io5";  //<IoHome />
import { PiTelevision } from "react-icons/pi"; //<PiTelevision />
import { FaRegBookmark } from "react-icons/fa"; //<FaRegBookmark/>
import { MdLocalMovies } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import TvCard from '../Card/TvCard';
import ApiCall from '../UIApis/ApiCalls';


function Home(){
  Apis()
  ApiCall()
  const naviagte = useNavigate();
  const [searchItem , setSearchitem] = useState()

  function handleSearchChange(e){
    setSearchitem(e.target.value)
  }

  function xyz(){
    let id = "HomePage"
    naviagte(`/search/${searchItem}/${id}`)
  }

  const trendingData = useSelector((state) => state.trendingData);
  const popularData = useSelector((state) => state.popularData);

 let renderTrending = "";
  renderTrending = (trendingData.length>0)?
  trendingData.slice(0,8).map((trending,index) => (
   <TrendingCard key={index} data={trending}/>
 )):null

 let renderpopular = "";
  renderpopular = (popularData.length>0)?
  popularData.slice(0,19).map((popular,index) => (
   <TvCard key={index} data={popular}/>
 )):null
  

     return(

      <div className="flex flex-col lg:flex-row bg-slate-900 overflow-y-auto">
        {/* left bar */}
            <div className=" w-full lg:w-1/12 bg-slate-900  lg:h-screen z-50">
              {/* nav bar */}
              <div className=" flex justify-center items-center w-full  lg:w-auto fixed  lg:ml-3 xl:ml-6 ">
              <div className="bg-slate-900 lg:bg-slate-800 w-full flex lg:block pt-6 md:pt-12 lg:pt-0 h-20  lg:h-screen lg:w-16 xl:w-20 lg:rounded-xl text-center lg:py-4 text-xl ">
              <div className="text-red-600 hover:text-red-400 flex justify-center pl-6 md:pl-10 lg:pl-6 px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 text-2xl cursor-pointer"><button onClick={()=>{naviagte("/home");}}><MdMovieCreation /></button></div>
              <div className="text-gray-400 hover:text-white  flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/home");}}><IoHome /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/movies");}}><MdLocalMovies /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/tvseries");}}><PiTelevision /></button></div>
             <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer"><button onClick={()=>{naviagte("/bookmarks");}}><FaRegBookmark/></button></div>
             {/* user logo */}
             <div className="flex justify-center items-center lg:items-none px-12 lg:px-0 lg:h-screen md:w-full lg:w-auto md:float-right lg:float-none md:ml-64 lg:ml-0 lg:mr-8 xl:mr-12">
             <button onClick={()=>{naviagte("/userinfo");}}>
              <div className=" bg-white w-6 md:w-8 lg:w-8 xl:w-12 h-6 md:h-8 lg:h-8 xl:h-12 rounded-full  cursor-pointer lg:absolute lg:bottom-12 "></div></button>
              </div>
              </div>
              </div>
              {/* nav bar end */}
            </div>
            {/* right bar */}
           <div className="w-full lg:w-11/12 bg-slate-900 h-screen ">
            {/* vertical grid */}       
                 <div className="lg:h-20 xl:h-24 md:pt-0 lg:pt-2 xl:pt-0 bg-slate-900 w-full flex items-center fixed xl:sticky top-16 md:top-20 lg:top-0 z-50"> 
                  {/* search bar */}
                  <div className="w-full  bg-slate-900 flex justify-center items-center pl-8 pr-4 md:px-12 lg:px-4 h-16 rounded-lg xl:pt-4 lg:mr-24 xl:mr-2"><CiSearch className="text-white text-2xl stroke-2 "/>
                  
                       <input placeholder="Search for Movies or TV Series" className="bg-slate-900 text-gray-200 border-0 rounded-md p-2 px-4 border-none focus:outline-none  transition ease-in-out duration-150 w-full" type="text" value={searchItem} onChange={handleSearchChange} name="search"/>
                       <button   onClick={xyz} className=' text-gray-200 p-2 px-4 md:px-6 xl:px-8 rounded-md xl:rounded-lg xl:mr-6 bg-slate-800 '>search
                       </button>
                       </div>
                 </div>
                 <div className=" h- lg:h-48 xl:h-56 bg-slate-900  lg:w-full mt-32 lg:mt-20 xl:mt-0 md:pt-8 xl:pt-2 lg:pt-0 ">
                  {/* trending card */}
                  <div className='text-white text-2xl ml-5 md:pl-2 lg:pl-0'>Trending</div>
                  <div className='flex flex-start overflow-hidden w-auto mx- md:mr-0'>{renderTrending}</div>
                 </div>
                 <div className="h-auto bg-slate-900 w-full ">
                    {/* recommdation */}
                    <div className='text-white text-2xl ml-5 pt-4 md:pt-6 lg:pt-4 xl:pt-0'>Recommended For you</div>
                    <div className='flex  flex-wrap flex-start justify-around lg:justify-between  '>{renderpopular}</div>
                 </div>
           </div>
      </div>


)
}

export default Home;


