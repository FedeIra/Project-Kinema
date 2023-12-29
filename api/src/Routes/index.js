const { Router } = require('express');
const router = Router();
const {
  // getSearchSeriesDB,
  // getSearchMovies,
  getAllSearch,
} = require('../controllers API/searchbar-controller');

// Import functions from controllers:

const { getGenresFromDB } = require('../controllers DB/getGenres.js');

const { getMoviesGenreById } = require('../controllers API/genresMovies');

const Comment = require('../Db/Schema/comment.js');
const Like = require('../Db/Schema/like.js');

const {
  getMoviesByIdApi,
  getTrailerMovie,
} = require('../controllers API/detailedMovie.js');

const { getGenresFromAPI } = require('../controllers API/genresMovies.js');

const { getMovies } = require('../controllers API/only-movies');

const {
  getSeasonDetails,
} = require('../controllers API/detailedSeasonSelected.js');

const {
  // getTVSeriesByIdApi,
  getTrailerSerie,
} = require('../controllers API/detailedTVSerie.js');

const {
  getSeriesByGenre,
  // getAllSeriesDB,
} = require('../controllers DB/getDataDB.js');

const { getAllCarrusels } = require('../controllers API/homeAll.js');

const { getAllCarruselsTV } = require('../controllers DB/homeAllDB.js');

const {
  getDataTVJSON,
  getDetailTVJSON,
  // getDataSearchTVJSON,
  getAllSeriesJSON,
  getSeriesByGenreJSON,
} = require('../controllers local/getDataJSONSeries');

const {
  detailSeasonJSON,
} = require('../controllers local/detailedSeasonsSeriesJSON.js');

const { getDataComments } = require('../controllers DB/comments');

const { getAllMoviesJSON } = require('../controllers local/getDataJSON');

const paymenRoutes = require('./paymentRoutes');

const emailer = require ("../nodemailer/emailer")

router.use('/payment', paymenRoutes);

// ROUTES:
router.get('/season/:id/:season', async (req, res) => {
  try {
    const { id, season } = req.params;

    let season_detail = await getSeasonDetails(id, season);

    if (season_detail === undefined) {
      // if (typeof season_detail === 'string') return res.json(season_detail); //si NO existe la serie te envia un string
      // res.send(season_detail); //si existe la serie te envia un objeto con todos los datos
      season_detail = detailSeasonJSON(id, season);
    }
    res.json(season_detail);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get movie from API by ID with trailer:
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let movieDetail = await getMoviesByIdApi(id);

    if (movieDetail.hasOwnProperty('json')) {
      return res.json(movieDetail.data);
    }

    const trailer = await getTrailerMovie(id);

    movieDetail = {
      ...movieDetail,
      trailer,
    };
    res.send(movieDetail);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get TV series detail from JSON:
router.get('/tv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // let TVSeriesDetail = await getTVSeriesByIdApi(id);
    // if (typeof TVSeriesDetail === 'string') return res.json(TVSeriesDetail);
    let detail = await getDetailTVJSON(id);
    let trailer = await getTrailerSerie(detail.title);

    let TVSeriesDetail = {
      ...detail,
      trailer,
    };
    res.send(TVSeriesDetail);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get only movies:
router.get('/home/movies', async (req, res) => {
  const { page } = req.query;
  try {
    let movies = await getMovies(page);
    res.send(movies);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get movie/series from API by name search:
router.get('/home/search', async (req, res) => {
  try {
    const { page, name } = req.query;
    let data = await getAllSearch(page, name);

    /* if (data.length === 0) return res.status(204).send({ Error: 'Not found' }); */ // ROMPE EL CODIGO ==== VACIO

    data.sort((a, b) => {
      if (a.vote_average < b.vote_average) {
        return 1;
      }
      if (a.vote_average > b.vote_average) {
        return -1;
      }
      return 0;
    });
    return res.send(data);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get movies/series carrusels from API:
router.get('/home', async (req, res) => {
  try {
    const allCarruselsMovies = await getAllCarrusels();
    const allCarruselsSeries = await getAllCarruselsTV();
    res.send({
      allCarruselsMovies,
      allCarruselsSeries,
    });
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get serie by genres:
router.get('/home/series/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getSeriesByGenre(id);
    res.send(data);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

// Get all serie from database:
router.get('/home/series', async (req, res) => {
  const { page } = req.query;
  try {
    // let skip = (page - 1) * 20;
    // let limit = 20;
    // let data = await getAllSeriesDB(skip, limit);
    let data = await getDataTVJSON(page);
    res.json(data);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

// Get genres from DB:
router.get('/home/genres/movies', async (req, res) => {
  try {
    const genres = await getGenresFromAPI();
    res.send(genres);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get movies by genre and page:
router.get('/movies_by_genre', async (req, res) => {
  const { id, page } = req.query;
  try {
    const genres = await getMoviesGenreById(id, page);
    res.send(genres);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get genres from DB:
router.get('/genres', async (req, res) => {
  try {
    const genres = await getGenresFromDB();
    res.send(genres);
  } catch (error) {
    return res.status(204).send({ Error: error.message });
  }
});

// Get series by genres from JSON:
router.get('/home/series_by_genre', async (req, res) => {
  const { genre, page } = req.query;
  try {
    // let skip = (page - 1) * 20;
    // let limit = 20;
    // let data = await getSeriesByGenre(genre, skip, limit);
    const data = await getSeriesByGenreJSON(genre, page);
    res.send(data);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.post('/comments', async (req, res) => {
  const { userId, content, date, idReference } = req.body;
  try {
    Comment.create({ userId, content, date, idReference });
    res.status(201).json('creado!');
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let info = await getDataComments(id);
    res.status(200).send(info);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let json = await Comment.deleteOne({ _id: id });
    res.status(200).json(json);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.post('/like', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.create({ idUser, idContent });
    res.status(201).json(json);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.post('/dislike', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.deleteOne({ idUser, idContent });
    res.status(200).json(json);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.get('/likes_from/:idContent', async (req, res) => {
  const { idContent } = req.params;
  try {
    let json = await Like.find({ idContent });
    res.status(200).json(json.length);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.get('/likes_from_user/:idUser', async (req, res) => {
  const { idUser } = req.params;
  try {
    let json = await Like.find({ idUser });
    res.status(200).json(json);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

router.get('/islike', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.findOne({ idUser, idContent });
    res.status(200).json(json);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

//  Get all movies and tv series for admin content panel:
router.get('/panelAdmin', async (req, res) => {
  try {
    const movies = await getAllMoviesJSON();
    const series = await getAllSeriesJSON();
    const allContent = movies.concat(series);
    res.send(allContent);
  } catch (error) {
    return res.status(204).json({ Error: error.message });
  }
});

// nodemailer: Welcome email

router.post("/email", async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMail(body.email, body.user)
    res.status(200).json('email enviado!');
  } catch (e) {
    return res.status(204).json({ Error: e.message });
  }
});

// nodemailer: Upgrade email

router.post("/email/upgrade", async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailUpgrade(body.email, body.user)
    res.status(200).json('email de upgrade enviado!');
  } catch (e) {
    return res.status(204).json({ Error: e.message });
  }
})

// nodemailer: Rent email
router.post("/email/rent", async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailRent(body.email, body.title, body.img, body.date, body.user)
    res.status(200).json('email de rent enviado!');
  } catch (e) {
    return res.status(204).json({ Error: e.message });
  }
})

// nodemailer: Contact us email
router.post("/email/contact", async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailContact(body.email, body.user, body.message)
    res.status(200).json('email de contact enviado!');
  } catch (e) {
    return res.status(204).json({ Error: e.message });
  }
})

module.exports = router;
