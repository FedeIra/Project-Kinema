const seasons = require('../backup/series_seasons.json');

// Get detail season by id serie and season number:

const detailSeasonJSON = (id, season_number) => {
	let data = seasons.find( serie => serie.id == id).seasons;

	return data[season_number - 1] === null ? { id: false } : data[season_number - 1]
};

module.exports = {
	detailSeasonJSON
}

