/******************************************************* custom middleware to log requests *******************************************************/

//imports
const fs = require('fs');


function logRequest(fileName)
{
    return (request, response, next) => 
    {
        fs.appendFile(fileName, `${request.ip} -> ${new Date()} -> ${request.method} -> ${request.url} -> ${JSON.stringify(request.params)} -> ${JSON.stringify(request.body)} \n`, (err) => 
        {
            if(err)
                console.log(err);
        });
        next();
    }
}


//exports
module.exports = logRequest;