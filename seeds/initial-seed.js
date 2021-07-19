// the skeleton for this file was made with command:
// npx knex seed:make initial-seed

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('scores').del()
    .then(function () {
      // Inserts seed entries
      return knex('scores').insert([
        { username: 'julian', password: 'asdf', hiscore: 0 },
        { username: 'dot', password: 'qwer', hiscore: 0 },
        { username: 'ian', password: 'zxcv', hiscore: 0 },
      ]);
    });
};
