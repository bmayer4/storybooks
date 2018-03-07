//commit this so app knows what to do in dev or prod

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dev');
} else {
    module.exports = require('./dev');  //need to change this
}