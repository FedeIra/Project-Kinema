const axios = require('axios');
require('dotenv').config();
const { YOUR_API_KEY_1 } = process.env;
const { getDataJSON } = require('../controllers local/getDataJSON.js');

const getMovies = async (page) => {
  const results = undefined;
  // await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${YOUR_API_KEY_1}&language=en-US&page=${page}`)
  // .then(d => d.data.results)
  // .catch(e => undefined)

  if (results === undefined) {
    let data = getDataJSON(page);
    return data;
  }

  const movieData = results.map((m) => {
    return {
      id: m.id,
      title: m.title,
      description: m.overview,
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
      let data = getDataJSON(page);
      return data;
    }
    if (!!data.results.length) return true;
    return false;
  };

  return validate(movieData);
};

module.exports = {
  getMovies,
};
