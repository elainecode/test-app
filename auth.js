const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { createUser, findUser, find_User_Auth }  = require('./authHelper');


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
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, async (req, username, password, done) => {
    try {
      //Save the information provided by the user to the the database
      console.log('REQ:', req)
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



//This verifies that the token sent by the user is valid
passport.use('jwt', new JWTstrategy({
  secretOrKey: process.env.SECRET,
  session: false,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (jwt_payload, done) => {
  try {
    console.log('in passport', jwt_payload.id)
    const user = await find_User_Auth(jwt_payload.id);
      if (user.usernotfound || user.message) {
        let err = user.usernotfound || user.message;
       console.log('user.usernotfound:', err)
        return done(null, false, { message: err});
      } else {
        console.log('###### LOL #######:', user)
        return done(null, user)
      }
      
  } catch (error) {
    done(error);
  }
}));

