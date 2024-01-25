// imports 

/* 
    * function to verify if user is logged in
    * if not will redirect to login page
    * else will call next()
*/
async function logRestriction(request, response, next)
{
    let userID = request.session.user;
    if(!userID)
        return response.redirect('/authentication/login');
    next();
}


// exports
module.exports = {
    logRestriction
}