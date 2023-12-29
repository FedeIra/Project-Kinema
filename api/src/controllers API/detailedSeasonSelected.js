require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const Serie = require('../Db/Schema/serie.js');

// Get TVSeries season and episodes by ID and season number:
const getSeasonDetails = async (id, season_number) => {
  const image_route = 'https://image.tmdb.org/t/p/w400';

  let dataSerie = await Serie.findOne({ id: id });
  if (!dataSerie) return 'Serie not found';

  const api_general_route = 'https://api.themoviedb.org/3';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const season_detail = await axios
    .get(
      `${api_general_route}/tv/${id}/season/${season_number}?api_key=${YOUR_API_KEY_1}`
    )
    .then((res) => res)
    .catch((err) => undefined);

  if (season_detail === undefined) return undefined;

  const season = {
    id: season_detail.data._id,
    air_date_first_episode: new Date(season_detail.data.air_date).getFullYear(),
    name:
      season_detail.data.name.charAt(0).toUpperCase() +
      season_detail.data.name.slice(1),
    poster: image_route + season_detail.data.poster_path,
    number_episodes: season_detail.data.episodes.length,
    season_number: season_detail.data.season_number,
    episodes: season_detail.data.episodes.map((episode) => {
      return {
        id: episode.id,
        name: episode.name,
        overview: episode.overview,
        episode_number: episode.episode_number,
        air_date: new Date(episode.air_date).toLocaleDateString(
          'en-US',
          options
        ),
        image: image_route + episode.still_path,
        duration: episode.runtime,
      };
    }),
  };

  return season;
};

module.exports = {
  getSeasonDetails,
};
