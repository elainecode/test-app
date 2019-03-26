const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);



const createUser = async (req) => {
  console.log('createUser req:', req.body)
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
    console.log('??', hash)
  }
  if(user) {
  console.log('????', user)
  return user[0]
  }
} catch (e) {
  console.log(e)
  return e
}
}
}


const findUser = async (req) => {
  console.log(req.body)
  const foundUser = await db('users')
  .where({ username: req.body.username })
  .first()
  if (foundUser != undefined || null) {
    console.log('foundUser in findUSER:', foundUser)
    const hashedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    if (hashedPassword === false) {
        console.log('hashedPassword:', hashedPassword)
      return {nomatch: 'incorrect credentials'}
      } 
      return foundUser
  } else {
    return {usernotfound: 'user is not registered'}
  }
  
}


const find_User_Auth = async (decoded) => {
  console.log('inside find_User_Auth Path...', decoded)
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
   console.log('error inside auth path: ', e)
  return e
}
  
}

const find_Gif = async (uid) => {
  console.log('find_Gif...', uid)
 try {
  const foundGif = await db('gifs')
  .where({ uid: uid})
  .first()
  console.log(' !! YES, find_Gif has foundGif =>', foundGif)
  if (foundGif) {
    return foundGif
  }
 }
 catch (e) {
  console.log('error in find_Gifs ===>' , e.message)
  return e
 }
}

const save_or_Delete_Favorites = async (array) => {


 const gifID = array[0].id
 const userID = array[1].id


 console.log(' <3 <3 saveordeletefave => ', gifID, userID)

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
      console.log(' :( error in saveordeletefave ===>' , e.message)
  }
} 


const find_User_Favorites = async (id) => {
  console.log(' ID in find_User_Favorites', id)
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
     console.log(' Error in find_User_Favorites')
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

