
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('gifs', table => {
      table.increments('id').primary();
      table.text('url');
      table.text('title');
      table.text('uid');
      table.specificType('tags', 'text ARRAY');
  }),
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.text('email');
      table.text('username');
      table.text('password');
      table.specificType('tags', 'text ARRAY');
  }),
     knex.schema.createTable('favorites', table => {
      table.increments('id').primary();
      table.integer('user_id')
      .references('id')
      .inTable('users');
       table.integer('gif_id')
      .references('id')
      .inTable('gifs');
  }),
      knex.schema.createTable('tags', table => {
      table.increments('id').primary();
      table.text('tagname');
    }),
      knex.schema.createTable('hashtags', table => {
      table.increments('id').primary();
      table.integer('gif_id')
      .references('id')
      .inTable('gifs');
       table.integer('tag_id')
      .references('id')
      .inTable('tags');
    })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('hashtags'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('gifs'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('tags')
    ])
};
