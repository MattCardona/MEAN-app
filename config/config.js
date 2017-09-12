var env = process.env.NODE_ENV || 'development' ;

if(env === 'development'){
  var config = require('./config.json')
  var envConfig = config[env];
console.log('in config file');
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}