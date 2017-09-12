var homeList = (req, res, next) => {
  res.render('locations-list', {title: 'Wifi4Free - Find places to work with wifi near you',
    pageHeader: {
      title: 'Wifi4Free',
      strapline: 'Find places to work with wifi near you'
    },
    sidebar: 'Looking for free wifi and a cup of Joe or a pitcher of beer? Wifi4Free will help you find a place to work when out on the town. Let us at Wifi4Free help you out with finding a place with free wifi.',
    locations: [{
      name: 'GreenMermaid',
      address: '44 Low Street, Sacramento, 95554',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'High Speed Wifi'],
      distance: '12m'
    },{
      name: 'Roasted',
      address: '444 Lower Street, Sacramento, 95554',
      rating: 4,
      facilities: ['Hot drinks', 'Food', 'High Speed Wifi'],
      distance: '10m'
    },{
      name: 'Paddys',
      address: '4444 Below Street, Sacramento, 95554',
      rating: 5,
      facilities: ['Cold beers', 'Food', 'High Speed Wifi'],
      distance: '5m'
    }]
} );
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