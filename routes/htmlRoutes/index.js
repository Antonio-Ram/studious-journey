const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    //want this to prompt a user it sign in or sign up
    //code for landing page
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;