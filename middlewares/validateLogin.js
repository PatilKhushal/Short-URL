// imports
const { userModel } = require("../models/shortURLModel");
const createCookie = require("../services/auth");
const bcrypt = require('bcrypt');

/* 
    * function to verfiy email exists
    * if email not exist then will redirect to /authentication/signup
    * if email exists then password is compared using bcrypt.compare()
    * if password matches then cookie is created
    * else is the same login page is rendered with error message
*/
async function validateLogin(request, response, next){
    let email = request.body.email;
    let user = await userModel.findOne({email});

    if(user){
        let res = await bcrypt.compare(request.body.password, user.password);
        if(!res){
            return response.render(
                'login', {
                        'error' : 'Invalid email or password'
                }
            )
        }

        createCookie(request, user._id, next);
    }
    else
        response.redirect('/authentication/signup');
}


// exports
module.exports = {
    validateLogin
}