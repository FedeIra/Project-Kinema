// const Genre = require('../Db/Schema/genre.js');
// const Serie = require('../Db/Schema/serie.js');

// const nameGenre = async (id) => {
//   let data = await Genre.findById(id);
//   return data.name;
// };

// const getSeriesByGenre = async (genero, omi, lim) => {
//   let genre = await Genre.findOne({ $and: [{ type: 'tv' }, { name: genero }] });
//   let dataSeries = await Serie.find({ genre: genre._id }).skip(omi).limit(lim);

//   let listSeries = [];
//   for (let i = 0; i < dataSeries.length; i++) {
//     let serie = {
//       serie: true,
//       id: dataSeries[i].id,
//       name: dataSeries[i].name,
//       popularity: dataSeries[i].popularity,
//       description: dataSeries[i].description,
//       poster: dataSeries[i].poster,
//       backPoster: dataSeries[i].backPoster,
//       vote_average: dataSeries[i].vote_average,
//       vote_count: dataSeries[i].vote_count,
//       first_air_date: dataSeries[i].first_air_date,
//     };
//     let genre = [];
//     for (let j = 0; j < dataSeries[i].genre.length; j++) {
//       genre.push(await nameGenre(dataSeries[i].genre[j]));
//     }
//     serie.genre = genre;
//     listSeries.push(serie);
//   }
//   return listSeries;
// };

// const getAllSeriesDB = async (omi, lim) => {
//   let dataSeries = await Serie.find().skip(omi).limit(lim);

//   let listSeries = [];
//   for (let i = 0; i < dataSeries.length; i++) {
//     let serie = {
//       serie: true,
//       id: dataSeries[i].id,
//       name: dataSeries[i].name,
//       description: dataSeries[i].description,
//       poster: dataSeries[i].poster,
//       backPoster: dataSeries[i].backPoster,
//       vote_average: dataSeries[i].vote_average,
//       vote_count: dataSeries[i].vote_count,
//       first_air_date: dataSeries[i].first_air_date,
//     };
//     let genre = [];
//     for (let j = 0; j < dataSeries[i].genre.length; j++) {
//       genre.push(await nameGenre(dataSeries[i].genre[j]));
//     }
//     serie.genre = genre;
//     listSeries.push(serie);
//   }
//   return listSeries;
// };


// module.exports = {
//   getSeriesByGenre,
//   getAllSeriesDB,
// };
