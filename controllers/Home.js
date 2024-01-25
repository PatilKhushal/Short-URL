const { urlModel } = require('../models/shortURLModel');
const nanoid = require('nanoid');

/* 
    * function to verify if short-url-id is present
    * if not then error is sent in json format
    * else db updates are made and user is redirecte to the mapped original url
*/
async function redirectURL(request, response)
{
    try
    {
        let id = request.params.id;
        let res = await urlModel.findOne({'id' : id});
        if(res)
        {
            await urlModel.findOneAndUpdate({'id' : id}, {$push : {history : {'time' : new Date()}}});
            return response.redirect(res.redirectURL);
        }
        
        return response.status(400).json({"error" : "InvalidID", "message" : `ID:${id} is Invalid`});
    }
    catch(error)
    {
        console.log(error);
        response.sendStatus(500);
    }
}

/* 
    * function to generate a short-url using nanoid
    * and storing the whole data in db
    * then call to showHomePage
*/
async function createShortURL(request, response)
{
    try
    {
        let url = request.body.redirectURL;
        if(url)
        {
            let id = nanoid.nanoid(6);
            let res = await urlModel.create({...request.body, "id" : id});
            return showHomePage(request, response);
        }

        return response.status(400).json({"error" : "InvalidURL", "message" : `Please enter a valid redirectURL`});
    }
    catch(error)
    {
        console.log(error);
        response.sendStatus(500);
    }
}

async function getAnalytics(request, response)
{
    try
    {
        let id = request.params.id;
        let res = await urlModel.findOne({"id" : id});
        if(res)
            return response.status(200).json({'totalClicks' : res.history.length, 'history' : res.history});

        return response.status(400).json({"error" : "InvalidID", "message" : `ID:${id} is Invalid`});
    }
    catch(error)
    {
        console.log(error);
        response.sendStatus(500);
    }
}

/* 
    * function to get all urls and render index page with these urls
*/
async function showHomePage(request, response)
{
    let allUrls = await urlModel.find({});
    return response.render('index', {
        allUrls,
        domain : process.env.shortUrlDomain
    });
}

module.exports = { createShortURL, redirectURL, getAnalytics, showHomePage };