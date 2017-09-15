var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose err :', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = (msg, cb) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    cb();
  });
}
// Nodemon termination
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// app termination
process.on('SIGINT', () => {
  gracefulShutdown('app terminated', () => {
    process.exit(0);
  });
});
// Heroku termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app', () => {
    process.exit(0);
  });
});

require('./locations.js');
