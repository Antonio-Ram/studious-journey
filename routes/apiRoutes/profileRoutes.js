const router = require('express').Router();

const {filterByQuery, findById, createNewProfile, validateProfile } = require ('../../lib/profiles');
const { profiles } = require('../../data/profiles');

router.get('/profiles', (req,res) => {
    let results = profiles;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/profiles/:id', (req, res) => {
    const result = findById(req.params.id, profiles);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/profiles', (req, res) => {
    req.body.id = profiles.length.toString();
    if(!validateProfile(req.body)) {
        res.status(400).send('The profile could not be created. Information not formatted properly')
    } else {
    const profile = createNewProfile(req.body, profiles);
    res.json(profile);
    }
});

module.exports = router; 
