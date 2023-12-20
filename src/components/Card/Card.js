
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { MdLocalMovies } from "react-icons/md";
import { PiTelevision } from "react-icons/pi"; 
import { MdFileDownloadDone } from "react-icons/md";   
import bookmarks from "../Bookmarks/Bookmark"



const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com"
const deletebookmarkURL = `${backendUrl}/deletebookmark`





function Card(props){
   const {data} = props;
     
    const {fetchBookmarks} = bookmarks()
      
      async  function handleevent(id,e){
        e.preventDefault()
        try {
          const response = await axios.delete(`${deletebookmarkURL}/${id}`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          fetchBookmarks()
        } catch (error) {
          // console.error('Error deleting bookmark:', error);
        }
        
      }         

      let link = (data.name)?(`/tvcast/${data.id}`):(`/cast/${data.id}`) 
  
  


    return(
        <div className="w-44 md:w-48 lg:w-56 bg-slate-900 pb-2">
        <Link to={link}>
        <div className="m-5 mb-1 bg-slate-900 rounded-xl hover:bg-gray-900 hover:scale-110 z-10 duration-700 relative ">
        <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})` }}
          className="rounded bg-cover bg-no-repeat bg-top h-24 ">
         <div className="h-8 w-8 rounded-full absolute top-1 right-1 bg-black opacity-50 hover:bg-gray-400 text-center">
        <button type="button" className="" onClick={(e) => {handleevent(data.id, e) }}>
        <MdFileDownloadDone className="text-white mt-2" />
       </button>
      </div>
      </div>
      </div>
        </Link>
         {/* bottom part */}
        <div className="mx-5">
        <div className="flex text-gray-400   pt-">
             <div className="mr-4 pl-1">{
             (data.first_air_date)?data.first_air_date.substring(0, 4):(data.release_date)?data.release_date.substring(0, 4):null
             }
         </div>
         {
           (data.name)?( <div className=" flex justify-center items-center"><PiTelevision className="mr-1"/>Tv Series</div>):(data.title)?(<div className=" flex justify-center items-center"><MdLocalMovies className="mr-1"/>Movie</div>):(null)
         }
            
          </div>
          <div className="text-white font-bold px-1">{data.name||data.title}</div>
      </div>
      </div>
    )
}

export default Card;
