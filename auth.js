const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { 
  createUser, 
  findUser, 
  find_User_Auth, 
  find_Gif, 
  save_or_Delete_Favorites, 
  find_User_Favorites
}  = require('./authHelper');


passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, async (req, email, password, done) => {
    try {
      const user = await createUser(req);
      if (user.duplicate != undefined) {
        return done(null, false, { message: user.duplicate});
      } else {
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
      const user = await findUser(req);
      if (user.nomatch) {
        return done(null, false, { message: user.nomatch});
      } 
      else if (user.usernotfound) {
        return done(null, false, { message: user.usernotfound});
      } else {
        return done(null, user)
      }   
    } catch (error) {
      done(error);
    }
}));


passport.use('jwt', new JWTstrategy({
  secretOrKey: process.env.SECRET,
  session: false,
  passReqToCallback: true,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (req, jwt_payload, done) => {
  try {  
 
    const user_gif = []
    if (req.body.uid) {
      const gif = await find_Gif(req.body.uid)
      if (gif) {
        user_gif.push(gif)
      }
    }

    const user = await find_User_Auth(jwt_payload.id);

      if (user.usernotfound || user.message) {
        let err = user.usernotfound || user.message;
        return done(null, false, {message: err});
      } else {
      if(user_gif.length > 0) {
        user_gif.push(user)
       const favorite = await save_or_Delete_Favorites(user_gif)
       if (favorite){
        return done(null, favorite)
      } else {
        return done(null, user_gif)
      }
      } else {
        return done(null, user)
      }
   }

  } catch (error) {
    done(error);
  }
}));


passport.use('jwtFavorites', new JWTstrategy({
  secretOrKey: process.env.SECRET,
  session: false,
  passReqToCallback: true,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (req, jwt_payload, done) => {
  try {   
    const user = await find_User_Auth(jwt_payload.id);
    if (user.id) { 
      const uids = await find_User_Favorites(user.id)
      if(uids.length > 0) {
        user.favorites = uids
        return done(null, user)
      } 
        return done(null, user)
    } else {
      return done(null, false, user);
    }

  } catch (error) {
    done(error);
  }
}));



