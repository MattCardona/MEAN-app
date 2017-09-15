var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
var Loc = mongoose.model('Location');

var sendJsonRes = (res, status, content) => {
  res.status(status).json(content);
}

var doAverageRating = (location) => {
  var reviewCount, ratingAverage, ratingTotal;

  if(location.reviews && location.reviews.length > 0){
    reviewCount = location.reviews.length;
    ratingTotal = location.reviews.reduce((memo, current, i, arr) => {
      memo += current.rating;
      return memo;
    }, 0);
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save().then((location) => {
      console.log(`Locations average rating updated ${ratingAverage}`);
    }, (err) => {
      sendJsonRes(res, 404, err);
    });
  }
};

var updateAverageRating = (locationId) => {
  Loc.findById(locationId).select('rating reviews').then((location) => {
    doAverageRating(location);
  }, (err) => {
    sendJsonRes(res, 404, err);
  })
};

var doAddReview = (req, res, location) => {
  if(!location){
    sendJsonRes(res, 404, {"message": `The location: ${location} was not found.`});
  }else{
    location.reviews.push({
    author: req.body.author,
    rating: req.body.rating,
    reviewText: req.body.reviewText
    });
    location.save().then((location) => {
      updateAverageRating(location._id);
      var reviewAdded = location.reviews[location.reviews.length -1];
      sendJsonRes(res, 201, reviewAdded);
    }, (err) => {
      sendJsonRes(res, 404, err);
    });
  }
};

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
        location: {
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
  var locationId = req.params.locationid;
  var reviewId = req.params.reviewid;

  if(!ObjectID.isValid(locationId) || !ObjectID.isValid(reviewId)){
    sendJsonRes(res, 404, {"message": `The locationId: ${locationId} or the reviewId: ${reviewId} are invaild.`});
  }
  Loc.findById(locationId).select('reviews').then((location) => {
    if(!location){
      sendJsonRes(res, 404, {"message": `Location with the locationId of: ${locationId} not found`});
    }
    if(location.reviews && location.reviews.length > 0){
      var review = location.reviews.id(reviewId);
      if(!review){
        sendJsonRes(res, 404, {"message": `location Review with review id of: ${reviewId} not found.`});
      }
      review.author = req.body.author;
      review.rating = req.body.rating;
      review.reviewText = req.body.reviewText;
      //save your instance updates
      location.save().then((location) => {
        updateAverageRating(location._id);
        sendJsonRes(res, 200, review);
      }, (err) => {
        sendJsonRes(res, 404, err);
      });
    }
  }).catch((err) => {
    sendJsonRes(res, 404, err);
  });
};

var reviewsDeleteOne = (req, res) => {
  sendJsonRes(res, 200, {"status" : "success"});
};

module.exports = {reviewsCreate, reviewsReadOne, reviewsUpdateOne, reviewsDeleteOne};