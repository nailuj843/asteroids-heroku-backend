// made with command: 
// npx knex migrate:make initial-migration

exports.up = function (knex) {
    return knex.schema.createTable('scores', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.integer('hiscore');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('scores');
};

