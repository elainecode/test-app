const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { createUser, findUser }  = require('./authHelper');


//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, async (req, email, password, done) => {
    try {
      //Save the information provided by the user to the the database
      const user = await createUser(req);
      //Send the user information to the next middleware
      if (user.duplicate != undefined) {
        console.log('user.duplicate:', user.duplicate)
        return done(null, false, { message: user.duplicate});
      } else {
        console.log('user:', user)
        return done(null, user)
      }
      
    } catch (error) {
      done(error);
    }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, async (req, email, password, done) => {
    try {
      //Save the information provided by the user to the the database
      console.log('REQ:', req.body)
      const user = await findUser(req);
      //Send the user information to the next middleware
      if (user.nomatch) {
        console.log('user.nomatch:', user.nomatch)
        return done(null, false, { message: user.nomatch});
      } 
      else if (user.usernotfound) {
         console.log('user.usernotfound:', user.usernotfound)
        return done(null, false, { message: user.usernotfound});
      } else {
        console.log('lol:', user)
        return done(null, user)
      }
      
    } catch (error) {
      console.log('erro???', error)
      done(error);
    }
}));


