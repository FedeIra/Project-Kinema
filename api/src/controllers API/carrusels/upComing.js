require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { upComingData } = require('../../controllers local/getDataCarruselsJSON.js');

const upComingFunction = async () => {
  const upComing = undefined;
    // await axios.get(`${api_general_route}/movie/upcoming?api_key=${YOUR_API_KEY_1}`)
    // .then( d => d.data.results)
    // .catch( e => undefined)
  if(upComing === undefined) {
    let data = upComingData();
    return data;
  }
  return upComing;
};

module.exports = {
	upComingFunction
}