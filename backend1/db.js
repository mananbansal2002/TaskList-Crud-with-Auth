const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './auth.db',
  },
  useNullAsDefault: true,
});

db.schema.hasTable('users').then((exists) => {
  if (!exists) {
    return db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
    });
  }
});

module.exports = db;
