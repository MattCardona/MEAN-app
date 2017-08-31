var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations.js');
var ctrlOthers = require('../controllers/others.js');

/* Locations page. */
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other page. */
router.get('/about', ctrlOthers.about);

module.exports = router;
