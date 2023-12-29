require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { topRatedData } = require('../../controllers local/getDataCarruselsJSON.js');

const topRatedFunction = async () => {
  const topRated = undefined;
    // await axios.get(`${api_general_route}/movie/top_rated?api_key=${YOUR_API_KEY_1}`)
    // .then( d => d.data.results)
    // .catch( e => undefined)
  if(topRated === undefined) {
    let data = topRatedData();
    return data;
  }
  return topRated;
};

module.exports = {
	topRatedFunction
}