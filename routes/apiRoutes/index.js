const router = require('express').Router();
const profileRoutes = require('./profileRoutes');

router.use('/profiles', profileRoutes);

module.exports = router;