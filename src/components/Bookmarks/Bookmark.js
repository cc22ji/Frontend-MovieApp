// BookmarkComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { MdMovieCreation } from "react-icons/md"; 
import { IoHome } from "react-icons/io5"; 
import { PiTelevision } from "react-icons/pi"; 
import { FaRegBookmark } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";


const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com";
const bookmarkURL = `${backendUrl}/bookmarks`;

const BookmarkComponent = () => {
  const naviagte = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [status, setStatus] = useState(0);
  


  // Fetch bookmarks from the backend
  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(bookmarkURL, {
        withCredentials: true,
        credentials: "include",
      })
      // Access data directly using response.data
      setStatus(response.status)
      if (response.status === "OK"||response.status === 200) {
        setBookmarks(response.data);
       
        setLoading(false)
      }
    } catch (error) {
      // console.error("Fetching data error.", error);
      // Log more details if available
      if (error.response) {
        // console.error("Response data:", error.response.data);
        // console.error("Response status:", error.response.status);
        setStatus(error.response.status);
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  let bookmarkslist = "";
  bookmarkslist =
    bookmarks.length > 0
      ? bookmarks.map((bookmark, index) => <Card key={index} data={bookmark} />)
      : null;

  return (

    <div>
      {
        (loading) ? (<p>loading.......</p>) : (<div>{
          (status === 200)?(<div>
             <div className="flex flex-col lg:flex-row bg-slate-900 overflow-y-auto">
      {/* left bar */}
          <div className=" w-full lg:w-1/12 bg-slate-900  lg:h-screen ">
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
         <div className="w-full lg:w-11/12  h-screen ">
          {/* vertical grid */}
               <div className=" bg-slate-900 mt-16 pt-6 md:pt-0 md:mt-28 lg:mt-8 xl:mt-8">
                {/* trending card */}
                <div className='text-white text-2xl ml-5 md:pl-2 lg:pl-0'>Bookmarks</div>
                <div className='flex  flex-wrap text-white justify-between'>{bookmarkslist}</div>
         </div>
         </div>
    </div>
          </div>):(<div>

       {alert("unauthorized user... Please login First")}
      {naviagte("/login")}
          </div>)
          
          }</div>)
      }
    </div>
   
  );
};

export default BookmarkComponent;


