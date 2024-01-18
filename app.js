const express = require('express');
const { connectToDB } = require('./connection');
const shortURL = require('./routes/shortURL');
const logRequest = require('./middlewares/logRequest');

const app = express();
const PORT = 3000;

// Handling Middlewares
app.use(express.json());
app.use(logRequest('log.txt'));

// Connection to DB
const dbName = 'Github'
const dbURL = `mongodb://127.0.0.1:27017/${dbName}`;
connectToDB(dbURL)
    .then(() => console.log(`connected to ${dbURL}`))
    .catch((err) => console.log(err));

// routes
app.use('/', shortURL);

// Listening at PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));