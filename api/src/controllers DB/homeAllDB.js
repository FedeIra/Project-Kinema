require('../Db/db.js');
const { topRatedSeries, latestSeries } = require('../controllers local/getDataCarruselsJSON.js');

const TVSeries = require('../Db/Schema/serie.js');

const getAllCarruselsTV = async () => {
  const allCarruselsTV = {};

  // let topRatedSeries = await TVSeries.find({})
  //   .sort({ vote_average: -1 })
  //   .limit(20);

  // topRatedSeries = topRatedSeries.map((serie) => {
  //   return {
  //     ...serie._doc,
  //     serie: true,
  //   };
  // });

  // let latestSeries = await TVSeries.find({})
  //   .sort({ first_air_date: -1 })
  //   .limit(20);

  // latestSeries = latestSeries.map((serie) => {
  //   return {
  //     ...serie._doc,
  //     serie: true,
  //   };
  // });

  allCarruselsTV.topRatedSeries = topRatedSeries();

  allCarruselsTV.latestSeries = latestSeries();

  return allCarruselsTV;
};

module.exports = {
  getAllCarruselsTV,
};
