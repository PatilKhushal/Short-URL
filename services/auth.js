/* 
    * function to create session and add attribute user with userID as values
*/
function createCookie(request, userID, next)
{
    request.session.regenerate(
        (err) => {
            if(err){
                console.log(err);
            }
            else{
                request.session.user = userID;
                next();
            }
        }
    )
}

module.exports = createCookie;