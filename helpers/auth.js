
// module.exports = (req, res, next) => {
//     // if (req.isAuthenticated()) {
//     //    return next();
//     // } 
//     // if (req.user) {  //this works also
//     //     return next();
//     //  } 
//     // res.redirect('/');

//     req.user ? next() : res.redirect('/');
// }

const authRequired = (req, res, next) => {
    req.user ? next() : res.redirect('/');
};

const isGuest = (req, res, next) => {
    req.user ? res.redirect('/dashboard') : next();
};

module.exports = {
    authRequired: authRequired, 
    isGuest: isGuest
}