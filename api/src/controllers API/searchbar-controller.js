const axios = require('axios');
const e = require('express');
const Genre = require('../Db/Schema/genre.js');
const Serie = require('../Db/Schema/serie.js');
require('dotenv').config();
const { getDataSearchJSON } = require('../controllers local/getDataJSON.js');
const {
  getDataSearchTVJSON,
} = require('../controllers local/getDataJSONSeries.js');
const { YOUR_API_KEY_1 } = process.env;

const getSearchSeriesDB = async (page, name) => {
  // let skip = (page - 1) * 20;
  // let limit = 20;
  // let dataSeries = await Serie.find({ name: new RegExp(name, 'i') })
  //   .sort({ vote_average: -1 })
  //   .skip(skip)
  //   .limit(limit);
  // const search = dataSeries.map((e) => {
  //   return {
  //     id: e.id,
  //     name: e.name,
  //     poster: e.poster,
  //     vote_average: e.vote_average,
  //     serie: true,
  //   };
  // });

  return getDataSearchTVJSON(page, name);
};

const getSearchMovies = async (page, name) => {
  const results = undefined;
    // await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${YOUR_API_KEY_1}&language=en-US&query=${name}&page=${page}&include_adult=false`)
    // .then( d => d.data.results)
    // .catch( e => undefined)

  if (results === undefined) {
    let data = getDataSearchJSON(page, name);
    return data;
  }

  if (results.length === 0) return [];
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
    if(data === undefined) {
      let data = getDataSearchJSON(page, name)
      return data;
    }
    if (!!data.results.length) return true;
    return false;
  };

  return validate(movieData);
};

const getAllSearch = async (page, name) => {
  let allSeries = await getSearchSeriesDB(page, name);
  let allMovies = await getSearchMovies(page, name);
  let largoMax = allSeries.length > allMovies.length ? allSeries.length : allMovies.length
  let all = [];
  for (let i = 0; i < largoMax; i++) {
    if(allMovies[i]){
      all.push(allMovies[i])
    }
    if(allSeries[i]){
      all.push(allSeries[i])
    }
    
  }
  return all;
};

module.exports = {
  getSearchSeriesDB,
  getSearchMovies,
  getAllSearch,
};
