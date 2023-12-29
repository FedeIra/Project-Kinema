// const Genre = require('../Db/Schema/genre.js');
// const Serie = require('../Db/Schema/serie.js');
const data = require('../backup/BackUpSeries.json');
const genres_json = require('../backup/genres_series.json');

// TV Series for Home:
const getDataTVJSON = (page) => {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  const TVPage = data.slice(omit, limit);

  const TvSeries = TVPage.map((serie) => {
    return {
      serie: true,
      id: serie.id,
      genres: serie.genres,
      name: serie.title,
      description: serie.description,
      // poster: `/${serie.poster.split('/')[6]}`,
      poster: serie.poster,
      backPoster: serie.back_poster,
      vote_average: serie.rating,
      vote_count: serie.user_reviews,
      first_air_date: serie.release_date_first_episode,
    };
  });
  return TvSeries;
};

//Get all series for admin panel:
const getAllSeriesJSON = () => {
  const image_route = 'https://image.tmdb.org/t/p/original';

  const allSeries = data.map((serie) => {
    return {
      id: serie.id,
      title: serie.title,
      release_date: serie.release_date_first_episode,
      rating: serie.rating,
      image: image_route + serie.poster,
      serie: true,
    };
  });
  return allSeries;
};

// TV Series detail:
const getDetailTVJSON = (id) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const image_route = 'https://image.tmdb.org/t/p/original';

  const detail = data.find((movie) => movie.id == id);

  const serie = {
    id: detail.id,
    genres: detail.genres,
    title: detail.title,
    description: detail.description,
    rating: detail.rating,
    user_reviews: detail.user_reviews,
    release_date_first_episode: detail.release_date_first_episode,
    number_seasons: detail.number_seasons,
    poster: detail.poster,
    back_poster: detail.back_poster,
    serie: true,
  };

  // get detail of season one:
  let seasonOneDetail = {
    id: detail.season_one.id,
    air_date_first_episode: detail.season_one.air_date_first_episode,
    poster: detail.season_one.poster,
    number_episodes: detail.season_one.number_episodes,
    season_number: detail.season_one.season_number,
    episodes: detail.season_one.episodes.map((episode) => {
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
        duration: `${episode.duration} mins.`,
      };
    }),
  };

  serie.season_one = seasonOneDetail;

  return serie;
};

// Get Tv Series by search:
const getDataSearchTVJSON = (page, name) => {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  let regExp = new RegExp(name, 'i');
  let dataFiltered = data
    .filter((n) => regExp.test(n.title))
    .slice(omit, limit);

  const search = dataFiltered.map((e) => {
    return {
      id: e.id,
      name: e.title,
      // poster: `/${e.poster.split('/')[6]}`,
      poster: e.poster,
      vote_average: e.rating,
      serie: true,
    };
  });
  return search;
};

const getGenreIdJSON = (id) => {
  if (id == 10759) return 'Action and Adventure';
  if (id == 16) return 'Animation';
  if (id == 35) return 'Comedy';
  if (id == 80) return 'Crime';
  if (id == 99) return 'Documentary';
  if (id == 18) return 'Drama';
  if (id == 10751) return 'Family';
  if (id == 10762) return 'Kids';
  if (id == 9648) return 'Mystery';
  if (id == 10763) return 'News';
  if (id == 10764) return 'Reality';
  if (id == 10765) return 'Sci-Fi and Fantasy';
  if (id == 10766) return 'Soap';
  if (id == 10767) return 'Talk';
  if (id == 10768) return 'War and Politics';
  if (id == 37) return 'Western';
};

// Get Tv Series by genre:
const getSeriesByGenreJSON = (id, page) => {
  let omit = (page - 1) * 20;
  let limit = omit + 20;

  return data
    .filter((serie) => serie.genres.includes(id))
    .slice(omit, limit)
    .map((serie) => {
      return {
        ...serie,
        serie: true,
      };
    });
};

module.exports = {
  getDataTVJSON,
  getDetailTVJSON,
  getDataSearchTVJSON,
  getSeriesByGenreJSON,
  getAllSeriesJSON,
};
