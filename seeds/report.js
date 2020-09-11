exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('report')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('report').insert([
                {
                    week: 1,
                    titel: 'Kmom01',
                    content: `
# jsramverk-me-page

## How to run the application

### prerequisites
* nodejs version >= 12 (developed on version 14, but should work with the latest lts)

The easiest way to get the application up and running is to first use \`npm i\` to install all dependencies, after that use \`npm start\` to begin runnint the development server.
Once the server has started, it can be accessed on localhost:3000
`,
                },
            ]);
        });
};
