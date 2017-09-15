var express = require('express');
var router = express.Router();

var {locationsListByDistance, locationsCreate, locationsReadOne, locationsUpdateOne, locationsDeleteOne} = require('../controllers/locations');
var {reviewsCreate, reviewsReadOne, reviewsUpdateOne, reviewsDeleteOne} = require('../controllers/reviews');

//locations
router.get('/locations', locationsListByDistance);
router.post('/locations', locationsCreate);
router.get('/locations/:locationid', locationsReadOne);
router.put('/locations/:locationid', locationsUpdateOne);
router.delete('/locations/:locationid', locationsDeleteOne);

//reviews
router.post('/locations/:locationid/reviews', reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', reviewsDeleteOne);

module.exports = router;