var homeList = function(req, res, next) {
  res.render('locations-list', {title: 'Home'} );
};
var locationInfo = function(req, res, next) {
  res.render('locations-info', {title: 'Location Info'});
};
var addReview = function(req, res, next) {
  res.render('location-review-form', {title: 'Add review'});
};

module.exports = {homeList, locationInfo, addReview};