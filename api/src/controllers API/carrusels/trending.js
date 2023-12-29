require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { trendingData } = require('../../controllers local/getDataCarruselsJSON.js');

const trendingFunction = async () => {
  const trending = undefined
    // await axios.get(`${api_general_route}/trending/movie/day?api_key=${YOUR_API_KEY_1}`)
    // .then( d => d.data.results)
    // .catch( e => undefined)
  if(trending === undefined) {
    let data = trendingData();
    return data;
  }
  return trending;
};

module.exports = {
	trendingFunction
}