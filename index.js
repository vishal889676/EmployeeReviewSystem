const express = require("express");
const app = express();
const db = require("./config/monodb");
const port = process.env.PORT || 27017;
const MongoStore = require("connect-mongo");
const passportLocal = require("./config/passport");
const session = require("express-session");
const route = require("./routers");
//for body parser
const User = require("./model/user");
app.use(express.urlencoded({ extended: false }));//parse data
app.set("view engine", "ejs");//setup for view engine
app.set("views", "./views");//giving location from view

const passport = require("passport");
//initializethesession
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/session",

      // },function(err){
      //   console.log(err||'connect-mongo session');
      // })
    }),
  })
);
///for posport usess
app.use(passport.initialize());
app.use(passport.session()); 
app.use((req,res,next)=>{
  // console.log(req.user);
  //   console.log(req.session);
  next();
});
//  app.get("/admin", function (req, res) {
//    res.render("admin", { employeeList: [] });
//  });

app.use(passport.setAuthenticatedUser);

//console.log(req.session)
app.use("/", route);


// console.log(req.user);

//////////////////
app.listen(port, function (err) {
  if (err) {
    console.log("find some err while connecting to server");
    return;
  }
  console.log(`Server running successfully`);
});
