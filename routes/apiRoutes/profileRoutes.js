/*const router = require('express').Router();

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

module.exports = router; */

const router = require('express').Router();
const { Profile } = require('../../models');

router.get('/', (req, res) => {
    Profile.findAll()
    .then(dbProfileData => res.json(dbProfileData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Profile.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbProfileData => {
        if (!dbProfileData) {
            res.status(404).json({ message: 'No use found with this id' });
            return;
        }
        res.json(dbProfileData);
    })
    .catch(err => {
        console.log(err);
        res.status().json(error);
    });
});

router.post('/', (req, res) => {
    Profile.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbProfileData => res.json (dbProfileData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Profile.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbProfileData => {
        if(!dbProfileData[0]) {
            res.status(404).json({ message: 'No profile found with this id' });
            return;
        }
        res.json(dbProfileData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Profile.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProfileData => {
        if(!dbProfileData) {
            res.status(404).json({ message: 'No profile found with this id' });
            return;
        }
        res.json(dbProfileData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
