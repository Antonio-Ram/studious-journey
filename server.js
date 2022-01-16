const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const { profiles } = require ('./data/profiles');

app.get('', (req, res) => {
    //want this to prompt a user it sign in or sign up
    res.send('hello!');
})

function filterByQuery(query, profilesArray) {
    let filteredResults = profilesArray;
    if (query.city) {
        filteredResults = filteredResults.filter(profile => profile.city === query.city);
    }
    if (query.last_name) {
        filteredResults = filteredResults.filter(profile => profile.last_name === query.last_name);
    }
    if (query.first_name) {
        filteredResults = filteredResults.filter(profile => profile.first_name === query.first_name);
    }
    return filteredResults;
}

function findById(id, profilesArray) {
    const result = profilesArray.filter(profile => profile.id === id) [0];
    return result;
}

app.get('/api/profiles', (req,res) => {
    let results = profiles;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/profiles/:id', (req, res) => {
    const result = findById(req.params.id, profiles);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

