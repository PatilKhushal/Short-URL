const express = require('express');
const Router = express.Router();
const { createShortURL, redirectURL, getAnalytics } = require('../controllers/shortURL');

// handling POST request
Router.post('/', createShortURL);
Router.get('/:id', redirectURL);
Router.get('/analytics/:id', getAnalytics);

module.exports = Router;