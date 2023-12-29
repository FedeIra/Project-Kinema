const mongoose = require('mongoose');
require('dotenv').config();
const URL_DB = process.env.URL_DB;

mongoose.connect(URL_DB);

const database = mongoose.connection;

module.exports = database;