//commit this so app knows what to do in dev or prod
console.log('env is: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');  //set up heroku env variables
} else {
    module.exports = require('./dev');
}