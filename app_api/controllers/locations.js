var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
var Loc = mongoose.model('Location');

var theEarth = (() => {
 var earthRadius = 3959; //6371 kilometers = to 3959 miles

 var getDistanceFromRads = (rads) => {
  return parseFloat(rads * earthRadius);
 };
 var getRadsFromDistance = (distance) => {
  console.log();
  return parseFloat(distance / earthRadius);
 };

 return {getDistanceFromRads, getRadsFromDistance};
})();

var sendJsonRes = (res, status, content) => {
  res.status(status).json(content);
};

var locationsListByDistance = (req, res) => {
  var {lng, lat, maxDis} = req.query;
  var lng = parseFloat(lng);
  var lat = parseFloat(lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    num: 10,
    // maxDistance: theEarth.getRadsFromDistance(maxDis)
  };

  if((!lng && lat!==0) || (!lat && lng!==0)){
    sendJsonRes(res, 404, {"message": "lng and lat query parameters are required"})
  }else{
    Loc.geoNear(point, geoOptions, (err, result, stats) => {
      if(err){
        sendJsonRes(res, 404, err);
      }else{
      var locations = result.map((doc) => {
        // console.log('distance of doc ***', doc.dis);
        return {
          distance: doc.dis,
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        }
      });
  sendJsonRes(res, 200, locations);
    }
  });
  }

};

var locationsCreate = (req, res) => {
  var location = new Loc({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
  //   openingTimes: [{
  //   days: req.body.days1,
  //   opening: req.body.opening1,
  //   closing: req.body.closing1,
  //   closed: req.body.closed1,
  //   },{
  //     days: req.body.days2,
  //     opening: req.body.opening2,
  //     closing: req.body.closing2,
  //     closed: req.body.closed2
  //   }]
  });
  location.save().then((doc) => {
    sendJsonRes(res, 201, doc);
  }, (err) => {
    console.log(`This is error: ${err}`);
    sendJsonRes(res, 404, err);
  });
};

var locationsReadOne = (req, res) => {
  var id = req.params.locationid;

  if(!ObjectID.isValid(id)){
    console.log(`The id ${id} is invalid!`);
    // return res.status(404).send();
    sendJsonRes(res, 404, {"message": `The id: ${id} is invaild.`});
  }
  Loc.findById(id).then((location) => {
    if(!location){
      // return res.status(404).send();
      sendJsonRes(res, 404, {"message": `Location with the id of: ${id} not found`})
    }
    sendJsonRes(res, 200, location);
  }, (err) => {
    sendJsonRes(res, 200, err);
  });
};

var locationsUpdateOne = (req, res) => {
  var id = req.params.locationid;

  if(!ObjectID.isValid(id)){
    console.log(`The id ${id} is invalid!`);
    // return res.status(404).send();
    sendJsonRes(res, 404, {"message": `The id: ${id} is invaild.`});
  }
  Loc.findById(id).select('-reviews -rating').then((location) => {
    if(!location){
      sendJsonRes(res, 404, {"message": `Location with the id of: ${id} not found`})
    }
    location.name = req.body.name;
    location.address = req.body.address;
    location.facilities = req.body.facilities.split(",");
    location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    // location.openingTimes: [{
    //   days: req.body.days1,
    //   opening: req.body.opening1,
    //   closing: req.body.closing1,
    //   closed: req.body.closed1,
    //   },{
    //   days: req.body.days2,
    //   opening: req.body.opening2,
    //   closing: req.body.closing2,
    //   closed: req.body.closed2
    // }];
    location.save().then((locationUpdated) => {
      sendJsonRes(res, 200, locationUpdated);
    }).catch((err) => {
      sendJsonRes(res, 404, err);
    });
  });
};

var locationsDeleteOne = (req, res) => {
  var id = req.params.locationid;
  if(!ObjectID.isValid(id)){
    sendJsonRes(res, 404, {"message": `The id: ${id} is invaild.`});
  }
  Loc.findByIdAndRemove(id).then((location) => {
    if(!location){
      sendJsonRes(res, 404, {"message": `Location with the id of: ${id} not found`})
    }
    sendJsonRes(res, 204, null);
  }, (err) => {
    sendJsonRes(res, 404, err);
  });
};

module.exports = {locationsListByDistance, locationsCreate, locationsReadOne, locationsUpdateOne, locationsDeleteOne};

