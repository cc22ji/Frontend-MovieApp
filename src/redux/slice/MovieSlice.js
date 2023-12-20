import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    movies: [],
    tvSeries : [],
    trendingData: [],
    popularData : []
}

const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers : {
        addMovies : (state,{payload})=>{
            state.movies = payload;
        },
        addTvSeries : (state ,action)=>{
            state.tvSeries = action.payload
        },
        setTrendingData: (state, action) => {
            state.trendingData = action.payload;
          },
        addPopularData: (state, action) => {
            state.popularData = action.payload;
          },
    }
})

export const {addMovies,addTvSeries,setTrendingData,addPopularData
} = movieSlice.actions;
export default movieSlice.reducer;