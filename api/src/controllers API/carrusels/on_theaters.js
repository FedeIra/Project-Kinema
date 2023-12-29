require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const api_general_route = 'https://api.themoviedb.org/3';
const { on_theatersData } = require('../../controllers local/getDataCarruselsJSON.js');

const on_theatersFunction = async () => {
  const on_theaters = undefined;
    // await axios.get(`${api_general_route}/movie/now_playing?api_key=${YOUR_API_KEY_1}`)
    // .then( d => d.data.results)
    // .catch( e => undefined)
  if(on_theaters === undefined) {
    let data = on_theatersData();
    return data;
  }
  return on_theaters;
};

module.exports = {
	on_theatersFunction
}