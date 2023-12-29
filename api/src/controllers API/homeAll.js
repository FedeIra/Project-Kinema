require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { trendingFunction } = require('./carrusels/trending.js');
const { on_theatersFunction } = require('./carrusels/on_theaters.js');
const { popularsFunction } = require('./carrusels/populars.js');
const { topRatedFunction } = require('./carrusels/topRated.js');
const { upComingFunction } = require('./carrusels/upComing.js');
const image_route = 'https://image.tmdb.org/t/p/original';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Get movie/serie carrusels from API for home all:
const getAllCarrusels = async () => {
  const allCarrusels = {};

  allCarrusels.trending = await trendingFunction();
  allCarrusels.on_theaters = await on_theatersFunction();
  allCarrusels.populars = await popularsFunction();
  allCarrusels.topRated = await topRatedFunction();
  allCarrusels.upComing = await upComingFunction();

  for (const carrusel in allCarrusels) {
    allCarrusels[carrusel] = allCarrusels[carrusel].map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? image_route + movie.poster_path : image_route + movie.poster,
        back_poster: movie.backdrop_path ? image_route + movie.backdrop_path : image_route + movie.back_poster,
        rating: movie.vote_average,
        release_date: new Date(movie.release_date).toLocaleDateString(
          'en-US',
          options
        ),
        genres: movie.genre_ids?.map((genre_id) => {
          if (genre_id === 27) return 'Horror';
          if (genre_id === 28) return 'Action';
          if (genre_id === 12) return 'Adventure';
          if (genre_id === 16) return 'Animation';
          if (genre_id === 35) return 'Comedy';
          if (genre_id === 80) return 'Crime';
          if (genre_id === 99) return 'Documentary';
          if (genre_id === 18) return 'Drama';
          if (genre_id === 10751) return 'Family';
          if (genre_id === 14) return 'Fantasy';
          if (genre_id === 36) return 'History';
          if (genre_id === 10402) return 'Music';
          if (genre_id === 9648) return 'Mystery';
          if (genre_id === 10749) return 'Romance';
          if (genre_id === 878) return 'Science Fiction';
          if (genre_id === 10770) return 'Tv Movie';
          if (genre_id === 53) return 'Thriller';
          if (genre_id === 10752) return 'War';
          if (genre_id === 37) return 'Western';
        }),
      };
    });
  }
  return allCarrusels;
};

module.exports = {
  getAllCarrusels,
};
