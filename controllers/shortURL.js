const urlModel = require('../models/shortURLModel');
const nanoid = require('nanoid');
const validURI = require('valid-url');

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

async function createShortURL(request, response)
{
    try
    {
        let url = request.body.redirectURL;
        if(url)
        {
            let id = nanoid.nanoid(6);
            await urlModel.create({...request.body, "id" : id});
            return response.status(201).json({'id' : id});
        }

        return response.status(400).json({"error" : "InvalidURL", "message" : `Please enter a valid redirectURL in json format`});
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

module.exports = { createShortURL, redirectURL, getAnalytics };