import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { FaRegBookmark } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { MdFileDownloadDone } from "react-icons/md";

const backendUrl =
  process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com";
const bookmarkURL = `${backendUrl}/home`;

function TrendingCard(props) {
  const { data } = props;
  const [icon, setIcon] = useState(<FaRegBookmark className="text-white " />);

  async function handleevent(data, e) {
    e.preventDefault();
    alert("working");
    try {
      await axios.post(bookmarkURL, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIcon(<MdFileDownloadDone className="text-white " />);
    } catch (error) {
      // console.error('Error saving bookmark:', error);
    }
  }

  let link = data.name ? `/tvcast/${data.id}` : `/cast/${data.id}`;
  return (
    <div className="w-80 md:w- lg:w-96 bg-slate-900 ">
      <Link to={link}>
        <div className="mx-4 md:mx-3 lg:mx-6 mt-3 bg-slate-900  rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 h- ">
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})`,alt : "/"
            }}
            className="rounded bg-cover bg-no-repeat bg-top h-40 w-96"
          >
            <div className="h-8 w-8 rounded-full float-right pt-2 mt-2 mr-8  bg-black opacity-50 hover:bg-gray-400 text-center">
              <button
                type="button"
                className=""
                onClick={(e) => {
                  handleevent(data, e);
                }}
              >
                {/* <FaRegBookmark className="text-white" /> */}
                {icon}
              </button>
            </div>
            {/* bottom part */}
            <div className="mx-1 pt-24 ">
              <div className="flex text-gray-300  pt-">
                <div className="mr-4 pl-1">
                  {data.first_air_date
                    ? data.first_air_date.substring(0, 4)
                    : data.release_date
                    ? data.release_date.substring(0, 4)
                    : null}
                </div>
                {data.name ? (
                  <div className=" flex justify-center items-center">
                    <PiTelevision className="mr-1" />
                    Tv Series
                  </div>
                ) : data.title ? (
                  <div className=" flex justify-center items-center">
                    <MdLocalMovies className="mr-1" />
                    Movie
                  </div>
                ) : null}
              </div>
              <div className="text-white font-bold px-1">
                {data.name || data.title}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TrendingCard;
