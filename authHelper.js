const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);



const createUser = async (req) => {
  const foundUser = await db('users')
  .where({ email: req.body.email })
  .first()
  if (foundUser != null || undefined) {
    return ({duplicate: 'User already registered'})
  } 
  else {
  try {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await db('users')
  .returning('*')
  .insert({
    email: req.body.email,
    username: req.body.username,
    password: hash,
    tags: ['empty']
  })
  if(hash){
  }
  if(user) {
  return user[0]
  }
} catch (e) {
  console.log(e)
  return e
}
}
}


const findUser = async (req) => {
  const foundUser = await db('users')
  .where({ username: req.body.username })
  .first()
  if (foundUser != undefined || null) {
    const hashedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    if (hashedPassword === false) {
      return {nomatch: 'incorrect credentials'}
      } 
      return foundUser
  } else {
    return {usernotfound: 'user is not registered'}
  }
  
}


const find_User_Auth = async (decoded) => {
  try {
  const foundUser = await db('users')
  .where({ username: decoded })
  .first()
  if (foundUser != undefined || null) {
      return foundUser
  } else {
    return {usernotfound: 'incorrect credentials'}
  }
} catch(e) {
  return e
}
  
}

const find_Gif = async (uid) => {
 try {
  const foundGif = await db('gifs')
  .where({ uid: uid})
  .first()
  if (foundGif) {
    return foundGif
  }
 }
 catch (e) {
  return e
 }
}

const save_or_Delete_Favorites = async (array) => {


 const gifID = array[0].id
 const userID = array[1].id


  try {
      const duplicate  =  await db('favorites')
      .on('query', data => console.log(data))
      .returning('*')
      .where({gif_id: gifID})
      .andWhere({user_id: userID})
      
      if (duplicate.length > 0) {
        return db('favorites')
        .on('query', data => console.log(data))
        .where({gif_id: gifID})
        .andWhere({user_id: userID})
        .del().then(count => count)
     
      } else {
         return db('favorites')
          .on('query', data => console.log(data))
          .returning('*')
          .insert({user_id:  userID, gif_id:  gifID})
      }
  
  } catch (e) {
  }
} 


const find_User_Favorites = async (id) => {
  try {
    const uids =  await db('gifs')
    .on('query', data => console.log(data))
    .returning('uid')
    .innerJoin('favorites', 'gifs.id', 'favorites.gif_id')
    .where({user_id: id})
    if (uids) {
      return uids
    }
  } catch (e) {
      console.log(e)
  }
}

module.exports = { 
  createUser,
 findUser, 
 find_User_Auth, 
  find_Gif, 
  save_or_Delete_Favorites, 
  find_User_Favorites
}

