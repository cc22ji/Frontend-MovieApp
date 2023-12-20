import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdMovieCreation } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import TvCard from "../Card/TvCard";
import Apis from "../UIApis/Apis";
import ApiCall from "../UIApis/ApiCalls";

const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com";
const searchURL = `${backendUrl}/seachitem`;

function TvSeries() {
  Apis();
  ApiCall();
  const naviagte = useNavigate();
  const tvSeries = useSelector((state) => state.tvSeries);
  const [searchItem, setSearchitem] = useState();

  function handleSearchChange(e) {
    setSearchitem(e.target.value);
  }

  function xyz() {
    let id = "TvPage";
    naviagte(`/search/${searchItem}/${id}`);
  }

  let renderTvSeries = "";
  renderTvSeries =
    tvSeries.length > 0
      ? tvSeries
          .slice(0, 18)
          .map((tvSeries, index) => <TvCard key={index} data={tvSeries} />)
      : null;
  return (
    <div className="flex flex-col lg:flex-row bg-slate-900 overflow-y-auto">
      {/* left bar */}
      <div className=" w-full lg:w-1/12 bg-slate-900  lg:h-screen z-50">
        {/* nav bar */}
        <div className=" flex justify-center items-center w-full  lg:w-auto fixed  lg:ml-3 xl:ml-6 ">
          <div className="bg-slate-900 lg:bg-slate-800 w-full flex lg:block pt-6 md:pt-12 lg:pt-0 h-20  lg:h-screen lg:w-16 xl:w-20 lg:rounded-xl text-center lg:py-4 text-xl ">
            <div className="text-red-600 hover:text-red-400 flex justify-center pl-6 md:pl-10 lg:pl-6 px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 text-2xl cursor-pointer">
              <button
                onClick={() => {
                  naviagte("/home");
                }}
              >
                <MdMovieCreation />
              </button>
            </div>
            <div className="text-gray-400 hover:text-white  flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer">
              <button
                onClick={() => {
                  naviagte("/home");
                }}
              >
                <IoHome />
              </button>
            </div>
            <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer">
              <button
                onClick={() => {
                  naviagte("/movies");
                }}
              >
                <MdLocalMovies />
              </button>
            </div>
            <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer">
              <button
                onClick={() => {
                  naviagte("/tvseries");
                }}
              >
                <PiTelevision />
              </button>
            </div>
            <div className="text-gray-400 hover:text-white flex justify-center px-4 md:px-6 lg:px-auto lg:py-6 xl:py-8 cursor-pointer">
              <button
                onClick={() => {
                  naviagte("/bookmarks");
                }}
              >
                <FaRegBookmark />
              </button>
            </div>
            {/* user logo */}
            <div className="flex justify-center items-center lg:items-none px-12 lg:px-0 lg:h-screen md:w-full lg:w-auto md:float-right lg:float-none md:ml-64 lg:ml-0 lg:mr-8 xl:mr-12">
              <button
                onClick={() => {
                  naviagte("/userinfo");
                }}
              >
                <div className=" bg-white w-6 md:w-8 lg:w-8 xl:w-12 h-6 md:h-8 lg:h-8 xl:h-12 rounded-full  cursor-pointer lg:absolute lg:bottom-12 "></div>
              </button>
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
          <div className="w-full  bg-slate-900 flex justify-center items-center pl-8 pr-4 md:px-12 lg:px-4 h-16 rounded-lg xl:pt-4  lg:mr-24 xl:mr-2">
            <CiSearch className="text-white text-2xl stroke-2 " />
            <input
              placeholder="Search for Movies or TV Series"
              className="bg-slate-900 text-gray-200 border-0 rounded-md p-2 px-4 border-none focus:outline-none  transition ease-in-out duration-150 w-full"
              type="text"
              value={searchItem}
              onChange={handleSearchChange}
              name="search"
            />
            <button onClick={xyz} className="text-gray-200 p-2 px-4 md:px-6 xl:px-8 rounded-md xl:rounded-lg xl:mr-6 bg-slate-800">
              search
            </button>
          </div>
        </div>
        <div className=" bg-slate-900 mt-28 pt-4 md:pt-0 md:mt-36 lg:mt-20 xl:mt-0">
          {/* trending card */}
          <div className="text-white text-2xl ml-5 md:pl-2 lg:pl-0">
            Tv Series
          </div>
          <div className="flex  flex-wrap flex-start justify-between">
            {renderTvSeries}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvSeries;
