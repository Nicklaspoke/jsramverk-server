exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('user').insert([
                {
                    id: 1,
                    email: 'admin@admin.se',
                    password: '$2y$12$0W2m1DJdhCynSJMfgJXFvO7ZPFskynrSk4l.e9OdZDL2c0ab0Kxu.',
                },
            ]);
        });
};
