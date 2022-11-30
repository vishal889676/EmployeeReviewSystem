var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");

// const varifycallback = (email, password, done) => {
//   console.log("enter in callback of passport local");
//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         console.log("user not found passport local");
//         return done(null, false);
//       }
//       if (!user || user.password != password) {  
//         console.log("pasword not match in passport local");
//         return done(null, false);
//       } //return done(null,false);
//       console.log("user secsefully AUTHENTICATE BY passport local");
//       return done(null, user);
//     })
//     .catch((err) => {
//       console.log("error by passport callback", err);
//       return done(err);
//     });
// };
const strategy = new LocalStrategy(
  { usernameField: "email",passwordField: "psw"},
  (email, password, done) => {
    console.log(password,"enter in callback of passport local");
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          console.log("user not found passport local");
          return done(null, false);
        }
        if (!user || user.password != password) {
          console.log("pasword not match in passport local");
          return done(null, false);
        } //return done(null,false);
        console.log("user secsefully AUTHENTICATE BY passport local");
        return done(null, user);
      })
      .catch((err) => {
        console.log("error by passport callback", err);
        return done(err);
      });
  }
);
passport.use(strategy);

// Serialized and deserialized methods when got from session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  //console.log(id)
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => done(err));
});
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
    // return res.redner('profile');
  }
  return res.redner("login");
};
// passport.autherizedAdmin=function(req,res,next){
//     // check for super user
//     if(req.isAuthenticated()&& res.locals.user.userType==="admin"){
//       next();
//     }
//     else {
//       console.log("you are not autherised admin.");
//       return res.end("you are not autherized admin")
//     }
//   }
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("You are already autherized");
   // console.log(req.user); 
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
