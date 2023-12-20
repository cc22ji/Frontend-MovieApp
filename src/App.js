
import React from "react"
import{BrowserRouter, Routes, Route} from "react-router-dom"
import FrontPage from "./components/FrontPage/FrontPage"
import Home from "./components/Home/Home"
import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import Cast from "./components/Cast/Cast"
import TvCast from "./components/Cast/TvCast"
import Movies from "./components/Movies/Movies"
import TvSeries from "./components/TvSeries/TvSeries"
import Bookmarks from "./components/Bookmarks/Bookmark"
import NotFound from "./components/NotFound/NotFound"
import UserInfo from "./components/UserInfo/userinfo"
import { Provider } from "react-redux"
import Store  from "./redux/store/store"
import Search from "./components/Search/Search"

function App() {
  return (
    <div >
      <Provider store={Store}>
      <BrowserRouter>
          <Routes>
             <Route path="/" Component={FrontPage}/>
             <Route path="/login" Component={Login}/>
             <Route path="/signup" Component={Signup}/>
             <Route path="/home" Component={Home}/>
             <Route path="/movies" Component={Movies}/>
             <Route path="/tvseries" Component={TvSeries}/>
             <Route path="/cast/:id" Component={Cast}/>
             <Route path="/tvcast/:id" Component={TvCast}/>
             <Route path="/bookmarks" Component={Bookmarks}/>
             <Route path="/*" Component={NotFound}/>
             <Route path="/search/:searchItem/:id" Component={Search}/>
             <Route path="/userinfo" Component={UserInfo}/>
          </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
