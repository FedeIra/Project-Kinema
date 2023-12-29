require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const {
  getMoviesByGenreJSON,
  getGenresJSON,
} = require('../controllers local/getDataJSON.js');

const getGenresFromAPI = async () => {
  const genres = undefined;
  // await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${YOUR_API_KEY_1}&language=en-US`)
  // .then( d => d.data.genres)
  // .catch( e => undefined)

  if (genres === undefined) {
    let data = getGenresJSON();
    return data;
  }
  return genres;
};

const getMoviesGenreById = async (id, page) => {
  const results = undefined;
  // await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${YOUR_API_KEY_1}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`)
  // .then( d => d.data.results)
  // .catch( e => undefined)
  let idgenre = id;
  if (results === undefined) {
    let data = getMoviesByGenreJSON(id, page);
    return data;
  }

  const movieData = results.map((m) => {
    return {
      id: m.id,
      title: m.title,
      description: m.overview,
      vote_average: m.vote_average,
      poster: m.poster_path,
      backPoster: m.backdrop_path,
      genres: m.genre_ids?.map((m) => {
        if (m === 27) return 'Horror';
        if (m === 28) return 'Action';
        if (m === 12) return 'Adventure';
        if (m === 16) return 'Animation';
        if (m === 35) return 'Comedy';
        if (m === 80) return 'Crime';
        if (m === 99) return 'Documentary';
        if (m === 18) return 'Drama';
        if (m === 10751) return 'Family';
        if (m === 14) return 'Fantasy';
        if (m === 36) return 'History';
        if (m === 10402) return 'Music';
        if (m === 9648) return 'Mystery';
        if (m === 10749) return 'Romance';
        if (m === 878) return 'Science Fiction';
        if (m === 10770) return 'Tv Movie';
        if (m === 53) return 'Thriller';
        if (m === 10752) return 'War';
        if (m === 37) return 'Western';
      }),
    };
  });

  const validate = async (m) => {
    const moviesVal = [];
    for (let n of m) {
      let trailer = await fetchMovie(n.id);
      if (Array.isArray(trailer)) {
        return trailer;
      }
      if (
        !!n.title &&
        !!n.description &&
        !!n.backPoster &&
        !!n.id &&
        !!n.poster &&
        !!trailer
      )
        moviesVal.push(n);
    }

    return moviesVal;
  };

  const fetchMovie = async (id) => {
    const data = undefined;
    // await axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${YOUR_API_KEY_1}&language=en-US`)
    // .then( d => d.data)
    // .catch( e => undefined)

    if (data === undefined) {
      let data = getMoviesByGenreJSON(idgenre, page);
      return data;
    }
    if (!!data.results.length) return true;
    return false;
  };

  return validate(movieData);
};

module.exports = {
  getGenresFromAPI,
  getMoviesGenreById,
};
