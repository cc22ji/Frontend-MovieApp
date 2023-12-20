import React, { useEffect } from "react";
import { setTrendingData } from "../../redux/slice/MovieSlice";

import { useDispatch } from "react-redux";
const apiKey = process.env.API_KEY || "8170440d983c7c26f7238eed689fe9fc";
const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com";
const MovieDataUrl = `${backendUrl}/api/moviedata`;
const TvDataUrl = `${backendUrl}/api/tvdata`;
const HomeDataUrl = `${backendUrl}/api/Homedata`;

function Apis() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending movies
        const trendingMoviesEndpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
        const trendingMoviesResponse = await fetch(trendingMoviesEndpoint);
        const trendingMoviesData = await trendingMoviesResponse.json();

        // Fetch trending TV series
        const trendingTvSeriesEndpoint = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
        const trendingTvSeriesResponse = await fetch(trendingTvSeriesEndpoint);
        const trendingTvSeriesData = await trendingTvSeriesResponse.json();

        // Combine movies and TV series in a single array
        const combinedData = mixData(
          trendingMoviesData.results,
          trendingTvSeriesData.results
        );

        // Randomly select a subset of combined data
        const randomTrendingData = getRandomSubset(combinedData, 20);

        // Update the Redux store with the random trending data
        dispatch(setTrendingData(randomTrendingData));

        // Fetch popular Movies
        const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        const popularMoviesResponse = await fetch(popularMoviesEndpoint);
        const popularMoviesData = await popularMoviesResponse.json();
        //POST data in DATABAse
        if (popularMoviesData.total_results > 0) {
          try {
            const response = await fetch(MovieDataUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(popularMoviesData),
            });
            const result = await response.json();
          } catch (error) {
            // console.log("Unable to save movie Data")
          }
        } else {
          // console.log("No results found for the given movie title.");
        }

        // Fetch popular Tv Series
        const popularTvSeriesEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
        const popularTvSeriesResponse = await fetch(popularTvSeriesEndpoint);
        const popularTvSeriesData = await popularTvSeriesResponse.json();

        //post DATA IN database
        if (popularTvSeriesData.total_results > 0) {
          try {
            const response = await fetch(TvDataUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(popularTvSeriesData),
            });
            const result = await response.json();
          } catch (error) {
            // console.log("Unable to save Tv Data");
          }
        } else {
          // console.log('No TV series results found for the given search term.');
        }

        // Combine movies and TV series in a single array
        const combinedData2 = mixData(
          popularMoviesData.results,
          popularTvSeriesData.results
        );

        // Randomly select a subset of combined data
        const randomPopularData2 = getRandomSubset(combinedData2, 20);

        try {
          const response = await fetch(HomeDataUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(randomPopularData2),
          });
          const result = await response.json();
        } catch (error) {
          // console.log("Unable to save popular Data")
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to mix movies and TV series in a single array
  const mixData = (movies, tvSeries) => {
    const mixedData = [];

    for (let i = 0; i < Math.max(movies.length, tvSeries.length); i++) {
      if (i < movies.length) {
        // mixedData.push({ data: movies[i] });
        mixedData.push(movies[i]);
      }
      if (i < tvSeries.length) {
        mixedData.push(tvSeries[i]);
      }
    }

    return mixedData;
  };

  // Function to get a random subset of an array
  const getRandomSubset = (array, size) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  };
}

export default Apis;
