const router = require('express').Router();

const { Router } = require('express');
const apiRoutes = require('./apiRoutes');

router.use('/apiRoutes', apiRoutes);

router.use((req, res) => {
res.status(404).end();
});

module.exports = router; 