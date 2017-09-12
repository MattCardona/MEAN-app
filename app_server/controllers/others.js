var about = function(req, res, next) {
  res.render('generic-text', { title: 'About Wifi4Free',
    content: 'Wifi4Free was created to help people like myself, find a place to pop a squat and get some work done and have some delicious beverages. Wifi4Free was possible by our users, leaving reviews when ever possible for others to see where all the good spots in town are to get food, beverages, and best of all free wifi.\n\nFeel free to email us for future improvements. We are allways happy to hear what our users think.'
   });
};

module.exports = {about};