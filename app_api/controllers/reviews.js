var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
var Loc = mongoose.model('Location');

var sendJsonRes = (res, status, content) => {
  res.status(status).json(content);
}

var reviewsCreate = (req, res) => {
  var locationId = req.params.locationid;

  if(!ObjectID.isValid(locationId)){
    sendJsonRes(res, 404, {"message": `The locationId: ${locationId} or the reviewId: ${reviewId} are invaild.`});
  }
  Loc.findById(locationId).select('reviews').then((location) => {
    doAddReview(req, res, location);
  }).catch((err) => {
    sendJsonRes(res, 404, err);
  });
};

var reviewsReadOne = (req, res) => {
  var locationId = req.params.locationid;
  var reviewId = req.params.reviewid;

  if(!ObjectID.isValid(locationId) || !ObjectID.isValid(reviewId)){
    console.log(`The locationId ${locationId} is invalid!`);
    // return res.status(404).send();
    sendJsonRes(res, 404, {"message": `The locationId: ${locationId} or the reviewId: ${reviewId} are invaild.`});
  }
  Loc.findById(locationId).select('name reviews').then((location) => {
    if(!location){
      // return res.status(404).send();
      sendJsonRes(res, 404, {"message": `Location with the locationId of: ${locationId} not found`})
    }
    return location
  }).then((location) => {
    var review = location.reviews.id(reviewId);
    var response;

    if(!review){
      sendJsonRes(res, 404, {"message": `Location with the reviewId of: ${reviewId} not found`})
    }
    response = {
      loctaion: {
        name: location.name,
        id: locationId
      },
      review: review
    }
    sendJsonRes(res, 200, response);
  }).catch((err) => {
    sendJsonRes(res, 404, err);
  });
};

var reviewsUpdateOne = (req, res) => {
  sendJsonRes(res, 200, {"status" : "success"});
};
var reviewsDeleteOne = (req, res) => {
  sendJsonRes(res, 200, {"status" : "success"});
};

module.exports = {reviewsCreate, reviewsReadOne, reviewsUpdateOne, reviewsDeleteOne};