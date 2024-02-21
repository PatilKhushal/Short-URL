// imports
const { userModel } = require('../models/shortURLModel');


// function to render signup page
async function showSignupPage(request, response){
    return response.render('signup');
}


// function to render login page
async function showLoginPage(request, response){
    return response.render('login');
}


/* 
    * function that creates user after successfull signup
*/
async function handleUserSignup(request, response){
    await userModel.create(request.body);
    return response.redirect('/authentication/login');
}

// function that redirects user to home page after successfull login
async function handleUserLogin(request, response){
    return response.redirect('/user');
}


// function that redirects user to login page after successful logout
async function handleUserLogout(request, response){
    request.session.destroy(err => {
        if(err)
            console.log(err);
        else
            response.redirect('/authentication/login');
    })
}


// exports
module.exports = {
    showSignupPage,
    handleUserSignup,
    showLoginPage,
    handleUserLogin,
    handleUserLogout
};