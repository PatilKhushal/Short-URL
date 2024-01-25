// imports
require('dotenv').config();
const express = require('express');
const logRequest = require('./middlewares/logRequest');
const { connectToDB } = require('./connection');
const { logRestriction } = require('./middlewares/loggingRestriction');
const { nanoid } = require('nanoid');
const session = require('express-session');

const Home = require('./routes/client/Home');
const User = require('./routes/client/User');


// initialization
const app = express();


// Handling Middlewares
app.use(express.urlencoded({extended : false}));
app.use(logRequest(process.env.logFileName));
app.use(express.static('./public'));
app.use(
    session(
        {
            genid : function()
            {
                return nanoid();
            },
            secret: 'fq$&)CB3`~Dm\\GGOZ><[J]O52)`bGHPzSj&G|i?p~5-7n)ca+Aey&g.$mr.D.N[',
        }
    )
)
app.set('view engine', 'ejs');


// Connection to DB
const dbURL = `${process.env.dbURL}/${process.env.dbName}`;
connectToDB(dbURL)
    .then(() => console.log(`connected to ${dbURL}`))
    .catch((err) => console.log(err));


// routes
app.get('/', (request, response) => {return response.redirect('/user');});
app.use('/user', logRestriction, Home);
app.use('/authentication', User);


// Listening at PORT
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));