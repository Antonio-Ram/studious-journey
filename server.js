const fs = require('fs');
const path = require('path')

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { profiles } = require ('./data/profiles');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

/*app.get('', (req, res) => {
    //want this to prompt a user it sign in or sign up
    res.send('hello!');
})*/

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

function createNewProfile(body, profilesArray) {
    const profile = body;
    profilesArray.push(profile);
    fs.writeFileSync(
        path.join(__dirname, './data/profiles.json'),
        JSON.stringify({ profiles: profilesArray }, null, 2)
    );
    return profile;
}

function validateProfile(profile) {
    if (!profile.first_name || typeof profile.first_name !== 'string') {
        return false;
    }
    if (!profile.last_name || typeof profile.last_name !== 'string') {
        return false;
    }
    if (typeof profile.city !== 'string') {
        return false;
    }
    if (!profile.email || typeof profile.email !=='string') {
        return false;
    }
    if (typeof profile.PassWord !== 'string') {
        return false;
    }
    return true;
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

app.post('/api/profiles', (req, res) => {
    req.body.id = profiles.length.toString();
    if(!validateProfile(req.body)) {
        res.status(400).send('The profile could not be created. Information not formatted properly')
    } else {
    const profile = createNewProfile(req.body, profiles);
    res.json(profile);
    }
});