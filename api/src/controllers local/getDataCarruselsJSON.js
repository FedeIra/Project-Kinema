const on_theaters = require('../backup/carrusels_movies/on_theaters_movies.json');
const populars = require('../backup/carrusels_movies/populars_movies.json');
const topRated = require('../backup/carrusels_movies/topRated_movies.json');
const trending = require('../backup/carrusels_movies/trending_movies.json');
const upComing = require('../backup/carrusels_movies/upComing_movies.json');
const series_backup = require('../backup/BackUpSeries.json');

const on_theatersData = () => {
	return on_theaters;
};

const popularsData = () => {
	return populars;
};

const topRatedData = () => {
	return topRated;
};

const trendingData = () => {
	return trending;
};

const upComingData = () => {
	return upComing;
};

const topRatedSeries = () => {
	return series_backup
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 20)
		.map( s => {
			return {
				id: s.id,
				title: s.title,
				poster: s.poster,
				serie: true
			}
		});
};

const latestSeries = () => {
	return series_backup
		.sort((a, b) => Date.parse(b.release_date_first_episode) - Date.parse(a.release_date_first_episode))
		.slice(0, 20)
		.map( s => {
			return {
				id: s.id,
				title: s.title,
				poster: s.poster,
				serie: true
			}
		});
}

module.exports = {
	on_theatersData,
	popularsData,
	topRatedData,
	trendingData,
	upComingData,
	topRatedSeries,
	latestSeries
}