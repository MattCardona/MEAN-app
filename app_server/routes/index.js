var express = require('express');
var router = express.Router();

var {homeList, locationInfo, addReview} = require('../controllers/locations.js');
var {about} = require('../controllers/others.js');

/* Locations page. */
router.get('/', homeList);
router.get('/location', locationInfo);
router.get('/location/review/new', addReview);


/* Other page. */
router.get('/about', about);

module.exports = router;
