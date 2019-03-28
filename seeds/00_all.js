const retrieve = require('../helper.js')

const userData = retrieve.fewUsers();

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then( () => {
      return knex('hashtags').del()
    })
    .then( () => {
      return knex('users').del()
    })
    .then( () => {
      return knex('tags').del()
    })
    .then( () => {
      return knex('gifs').del()
    })
    .then( async () => {
      return knex('users').returning('*').insert(userData)
    })
     .then( () => {
     return Promise.all(retrieve.firstTenRecords())
    })
     .then ( async (promise_array) => {
      return await knex('gifs')
      .returning('*')
      .insert(promise_array)

     })
     .then( async (gif_array) => {
      const tagData = await Promise.all(retrieve.allTags()) 
      const tag_array = await knex('tags')
      .returning('*')
      .insert(tagData)
     return matchTagAndGif(gif_array, tag_array)
      })
     .then( async (hashtag_array) => {
      return knex('hashtags').insert(hashtag_array)
});

}

const matchTagAndGif = (gif_array, tag_array) => {
     hashtag_array = []
     gif_array.forEach((gif) => {
        for (let i = 0; i < tag_array.length; i++){
          if(gif.tags.includes(tag_array[i].tagname)) {
            hashtag_array.push({tag_id: tag_array[i].id, gif_id: gif.id})
          }
        }
      })
      return hashtag_array
    }

