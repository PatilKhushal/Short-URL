const express = require('express');
const Router = express.Router();
const { createShortURL, redirectURL, getAnalytics, showHomePage } = require('../../controllers/Home');

// handling requests
Router
    .get('/', showHomePage)
    .post('/', createShortURL)
    .get('/:id', redirectURL);

Router.get('/analytics/:id', getAnalytics);

module.exports = Router;