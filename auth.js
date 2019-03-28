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
}  

= require('./authHelper');

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
      console.log('error???', error)
      done(error);
    }
}));



//This verifies that the token sent by the user is valid
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
        console.log('in passport, is found gif successful?', user_gif)
      }
    }

    console.log('in passport', jwt_payload.id)

    const user = await find_User_Auth(jwt_payload.id);

      if (user.usernotfound || user.message) {
        let err = user.usernotfound || user.message;
        console.log('user.usernotfound:', err)
        return done(null, false, {message: err});
      } else {
      console.log('###### LOL #######:', user)
      if(user_gif.length > 0) {
        user_gif.push(user)
       const favorite = await save_or_Delete_Favorites(user_gif)
       if (favorite){
        console.log('favorite added??', favorite)
        return done(null, favorite)
      } else {
        return done(null, user_gif)
      }
      } else {
        return done(null, user)
      }
   }

  } catch (error) {
    console.log('error in passport...at done', error)
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
    
    console.log('=====in PASSPORT checking for jwt', jwt_payload.id)

    const user = await find_User_Auth(jwt_payload.id);

    if (user.id) { 
      
      const uids = await find_User_Favorites(user.id)

      if(uids.length > 0) {
        console.log('=====in PASSPORT checking for uid', uids)
        user.favorites = uids
        return done(null, user)
      } 
        console.log('=====in passport SKIPPED checking for uid', uids)
        return done(null, user)
     
    } else {
       console.log('=====in passport no userID', user)
      return done(null, false, user);
    }

  } catch (error) {
    console.log('====error in Passport...at done', error)
    done(error);
  }
}));



