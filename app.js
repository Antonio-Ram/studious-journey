const generatePage = require('./src/template-page.js');

const fs = require ('fs');

const profileDataArgs = process.argv.slice(2, process.argv.length);


fs.writeFile('index.html', generatePage(), err => {
    if (err) throw err;

    console.log('Profile complete!')
});