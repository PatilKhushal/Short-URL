// imports
const { userModel } = require("../models/shortURLModel");
const bcrypt = require('bcrypt');

/* 
    * function to verified if emailID already exists
    * if exists then json response is sent with error and message
    * else password is hashed and next() is called
*/
async function validateSignup(request, response, next){
    let emailID = request.body.email;
    let user = await userModel.findOne({email : emailID});
    if(user)
        return response.json({
            'error' : 'DuplicateID',
            'msg' : 'User Already exists'
    })
    request.body.password = await bcrypt.hash(request.body.password, 10);
    next();
}


// exports
module.exports = {
    validateSignup
}