var request = require('request');

var apiOptions = {
  sever: "http://localhost:3000"
};

if(process.env.NODE_ENV === 'production'){
  apiOptions.sever = "https://wifi4free.herokuapp.com"
}

var _formatDistance = (distance) => {
  var numDistance;
  var unit;
  if(distance > 1){
    numDistance = parseFloat(distance / 1000).toFixed(1);
    unit = 'km';
  }else{
    numDistance = parseFloat(distance, 10);
    unit = 'm';
  }
  return numDistance + unit;
};

var renderHomepage = (req, res, responseBody) => {
  var message;
  if(!Array.isArray(responseBody)){
    message = "API lookup error";
    responseBody = [];
  }else if(!responseBody.length){
    message = "No places found nearby";
  }
  res.render('locations-list', {title: 'Wifi4Free - Find places to work with wifi near you',
    pageHeader: {
      title: 'Wifi4Free',
      strapline: 'Find places to work with wifi near you'
    },
    sidebar: 'Looking for free wifi and a cup of Joe or a pitcher of beer? Wifi4Free will help you find a place to work when out on the town. Let us at Wifi4Free help you out with finding a place with free wifi.',
    locations: responseBody,
    message: message
} );
}

var homeList = (req, res, next) => {
  var path = '/api/locations';
  var requestOptions = {
    url: apiOptions.sever + path,
    method: "GET",
    json: {},
    qs: {
      lng: -121.5370557,
      lat: 38.5681132,
      maxDis: 20
    }
  }
  request(requestOptions, (err, response, body) => {
    var data = body;
    if(response.statusCode === 200 && data.length){
        data.forEach((location) => {
          location.distance = _formatDistance(location.distance);
        });
      }
    renderHomepage(req, res, data);
  });
};

var locationInfo = (req, res, next) => {
  res.render('locations-info', {title: 'GreenMermaid',
    pageHeader: {title: 'GreenMermaid'},
    sidebar: {
      context: ' GreenMermaid\'s cafe is on Wifi4Free because it has free wifi and comfy space to get some work done on your laptops.',
      callToAction: ' If you\'ve been here and like it - or it did not - please leave a review of the place - so others can be informed.'
    },
    location: {
      name: 'GreenMermaid',
      address: '44 Low Street, Sacramento, 95554',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'High Speed Wifi'],
      coords: {lat: 51.455041, lng: -0.9690884},
      openingTimes: [{
        days: 'Monday - Friday',
        opening: '5:00am',
        closing: '6:00pm',
        closed: false
      },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
      }, {
        days: 'Sunday',
        closed: true
      }],
      reviews: [{
        author: 'Ralph C',
        rating: 2,
        timestamp: '27 July 2017',
        reviewText: 'Good place. Did not serve pup-achinos.'
      },{
        author: 'Ty S',
        rating: 2,
        timestamp: '4 July 2017',
        reviewText: 'Good coffee, bad serves. Shame because the coffee was delicious.'
      }]
    }
});
};
var addReview = (req, res, next) => {
  res.render('location-review-form', {title: 'Review GreenMermaid on Wifi4Free',
pageHeader: {title: 'Review GreenMermaid'}
});
};

module.exports = {homeList, locationInfo, addReview};