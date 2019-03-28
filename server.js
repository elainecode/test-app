const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const path = require('path')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
const app = express();

const environment = process.env.NODE_ENV || 'production';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

require('dotenv').config({path: './.env'});

require('./auth');

//const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously

 app.use(express.static(path.join(__dirname, 'client/build')));

app.use( async (err, req, res, next) => {
  console.log("our middleware ran!" || err.message);
  return next();
});

app.post('/api/v1/signup', async (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err || info) {
      console.log(err || info)
      return res.json(err || info)
    } else {
      console.log(user)
      return res.status(200).json(user)
    }
  })(req, res, next)
});

app.post('/api/v1/login', async (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err || info) {
      console.log('err or info', err || info)
      return res.json(err || info)
    } else {
      console.log('user', user)
      const token = jwt.sign({id: user.username}, process.env.SECRET, {expiresIn: '1d'})
      return res.status(200).send({ user: user, token: token})
    }
  })(req, res, next)
});

app.get('/api/v1/auth', async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err || info) {
      console.log('err or info', err || info)
      return res.json(err || info)
    } 
    if (user) {
      console.log('user', user)
      return res.status(200).json(user)
    }
  })(req, res, next)
});

app.get('/api/v1/auth/favorites', async (req, res, next) => {
  passport.authenticate('jwtFavorites', (err, user, info) => {
    if (err || info) {
      console.log('err or info', err || info)
      return res.json(err || info)
    } 
    if (user) {
      return res.json(user.favorites)
    }
  })(req, res, next)
});

app.post('/api/v1/auth/favorites/toggle', async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err || info) {
      console.log('err or info', err || info)
      return res.json(err || info)
    } 
    if (user) {
      return res.json(user)
    }
  })(req, res, next)
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


  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.listen(PORT, () => console.log('running'))