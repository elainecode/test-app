const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());


app.use( async (err, req, res, next) => {
  console.log("our middleware ran!" || err.message);
  return next();
});


app.get('/api/v1/gifs', async (req, res, next) => {
  try { 
    const results = await db('gifs').select()
     return res.json(results);
  } catch (error)  {
      next(error)
    };
});


app.get('/api/v1/tags', async (req, res, next) => {
  try { 
    const results = await db('tags').select()
     return res.json(results);
  } catch (error)  {
      next(error)
    };
});


app.listen(PORT, () => console.log('running'))