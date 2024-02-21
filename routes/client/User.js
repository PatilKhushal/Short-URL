// importing
const express = require('express');
const { showSignupPage, handleUserSignup, showLoginPage, handleUserLogin, handleUserLogout } = require('../../controllers/User');
const { validateSignup } = require('../../middlewares/validateSignup');
const { validateLogin } = require('../../middlewares/validateLogin');


// initialization
const Router = express.Router();


// handling requests
Router
    .get('/signup', showSignupPage)
    .post('/signup', validateSignup, handleUserSignup)


Router
    .get('/login', showLoginPage)
    .post('/login', validateLogin, handleUserLogin)


Router
    .get('/logout', handleUserLogout)


// exports
module.exports = Router;