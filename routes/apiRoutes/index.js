const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
//const htmlRoutes = require('./')

router.use('/profiles', profileRoutes);
//router.use('/', htmlRoutes)

module.exports = router;