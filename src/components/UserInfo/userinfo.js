import React, { useEffect, useState } from "react";
import axios from "axios";
import pic from "../../images/height.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com";
const MovieUrl = `${backendUrl}/userinfo`;

function UserInfo() {
  const naviagte = useNavigate();

  const [userinfo, setUserinfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(MovieUrl, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.statusText == "OK"||response.status == 200) {
          setUserinfo(response.data);
        }
      } catch (error) {
        // console.error("Fetching data error.", error);

        // Log more details if available
        if (error.response) {
          // console.error("Response data:", error.response.data);
          // console.error("Response status:", error.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName == name) {
        return cookieValue;
      }
    }
    return null; // Return null if the cookie is not found
  }

  function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
  }

  function removeToken() {
    const tokenValue = getCookie("token");
    // setCookie("token", " ", 7);
    // naviagte("/login");
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userinfo ? (
        <div>
          <div>
            <div className="flex flex-col lg:flex-row bg-slate-900 overflow-y-auto">
              {/* left bar */}
              <div className=" w-full lg:w-1/12 bg-slate-900  lg:h-screen ">
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
              <div className="w-full lg:w-11/12  h-screen ">
                <div className=" bg-slate-900 mt-16 pt-6 md:pt-0 md:mt-28 lg:mt-8 xl:mt-8">
                  <div className="text-white mt-10 ml- md:pl-2 lg:pl-0">
                    <div className="bg-slate-900 h-full  flex  ">
                      <div className="w-5/6 md-96 mx-auto bg-slate-800 shadow-md rounded-md overflow-hidden m-4">
                        <div className="p-12 pl-4  flex items-center">
                          <div className="hidden md:block mr-0 md:mr-4  lg:ml-24">
                            <img
                              src={pic}
                              alt="User Avatar"
                              className="w-0 md:w-32 h-0 md:h-32 rounded-full object-cover"
                            />
                          </div>
                          <div className="md:px-6 ">
                            <div className="flex">
                              <h2 className="text-xl text-gray-400 font-semibold mb-4">
                                Name:
                              </h2>
                              <h2 className="text-xl text-white font-semibold mb-2 px-2 md:px-4">
                                {userinfo.name}
                              </h2>{" "}
                            </div>

                            <div className="flex ">
                              <h2 className="text-xl text-gray-400 font-semibold mb-4">
                                Email:
                              </h2>
                              <h2 className="text-xl text-white font-semibold mb-2 px-4  md:px-4">
                                {userinfo.email}
                              </h2>{" "}
                            </div>

                            <div className="text-blue-500 underline pl-2">
                              <Link>Change password?</Link>
                            </div>

                            <div className="flex mt-4 ">
                              <button
                                className="bg-slate-900 text-white py-2 px-12 rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:border-slate-600"
                                onClick={removeToken}
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="flex  flex-wrap text-white justify-between"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {alert("unothrozed user")}
          {naviagte("/login")}
        </div>
      )}
    </div>
  );
}

export default UserInfo;
