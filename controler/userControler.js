const User = require("../model/user");
const Review = require("../model/review");
//for giving sinup page
module.exports.sinup = function (req, res) {
  res.render("sinup");
};
//giving login page
module.exports.login = function (req, res) {
  return res.render("login");
};
//create user profile in our database
module.exports.create = async (req, res) => {
  if (req.body.password != req.body.password1) {
    //if password and repeat password are not same then plese go to sinup page
    return res.redirect("/users/sinup");
  }
  console.log("enter to create user by sinup form");
  try {
    //cheking user is already exit in my database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //if  user found
      return res.redirect("/users/login");
    } else {
      const obj = {
        //taking data from sinup form
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password1: req.body.password1,
        isAdmin: false,
      };
      const newuser = new User(obj);
      newuser.save();
      console.log(newuser);
      console.log("user succesful created");
      return res.redirect("/users/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/users/sinup");
  }
};
//fist check than create user session
module.exports.createSession = function (req, res) {
  if (!req.isAuthenticated()) {
    console.log("not logged in");
    return res.redirect("/home");
  }

  return res.redirect("/admin/");
};
module.exports.home = async function (req, res) {
  //home page contrler
  try {
    //if user is not looged in then send back yo login
    if (!req.isAuthenticated()) {
      console.log("not logged in");
      return res.redirect("/users/login");
    }
    console.log("enter in home controler")
    let user = await User.findById(req.user.id);
    let review = await Review.find({ to: req.user.id });      
    //console.log(user);  
    //console.log(review)
    let recipients = [];
    for (let i = 0; i < user.to.length; i++) {
      let x = await User.findById(user.to[i]);
      recipients.push(x);
    }
    // find reviews
    let reviews = [];

    for (let i = 0; i < review.length; i++) {
      let x = await User.findById(review[i].from);
      let curr_review = {
        name: x.username,
        review: review[i].review,
      }; 
      //console.log(curr_review.name);
      reviews.push(curr_review);
    }
    return res.render("home", {
      title: "ERS | Home page",
      recipients: recipients,
      reviews: reviews,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
//loout user
module.exports.logout = function(req, res) {
   req.logout();
   console.log("Logeed Out");
   return res.redirect("/users/login");
}

// module.exports.home =async(req,res)=>{//goto home page with the appropiate info.
//  //IF user is not login then send back to login
//  if(!req.isAuthenticate()){
//     console.log('please login this user')
//     res.redirect('/users/login')
//  }
//  try{
//     const user=await User.findOne(req.user.id);
//     let review = await Review.find({ to: req.user.id });

//  }catch(err){
//     console.log(err)
//     retrun;
//  }

// };
