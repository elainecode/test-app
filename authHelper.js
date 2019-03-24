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
  const foundUser = await db('users')
  .where({ email: req.body.email })
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

module.exports = { createUser, findUser }
