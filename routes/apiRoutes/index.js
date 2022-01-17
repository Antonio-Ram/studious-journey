const router = require('express').Router();
const profileRoutes = require('../apiRoutes/profileRoutes');

router.use(profileRoutes);

module.exports = router;