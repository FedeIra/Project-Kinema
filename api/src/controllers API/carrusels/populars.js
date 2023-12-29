require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { popularsData } = require('../../controllers local/getDataCarruselsJSON.js');

const popularsFunction = async () => {
  const populars = undefined;
    // await axios.get(`${api_general_route}/movie/popular?api_key=${YOUR_API_KEY_1}`)
    // .then( d => d.data.results)
    // .catch( e => undefined)
  if(populars === undefined) {
    let data = popularsData();
    return data;
  }
  return populars;
};

module.exports = {
	popularsFunction
}