const User=require('../model/user');
const Review=require('../model/review');
module.exports.adminPage = async (req, res)=>{
    if (!req.isAuthenticated()) {
      //chek req is not authenticated or not
      return res.redirect("/users/login"); //send to login form
    }
    if(req.user.isAdmin==false){
      return res.redirect("/home");
    }
    try{
        const employeList = [];
        const user= await User.find({});//finding user from mongodb
        for(var i=0;i<user.length;i++){
            const temp={
               name: user[i].username,
               id: user[i].id
            }
           employeList.push(temp); 
        }
         return res.render("admin", {//renderring the admin page
           title: "Admin page",
           employeList: employeList,
         });
     
    }catch(err){
     console.log("err in adminpage controler",err);   //err in admin controler
    }

  res.render("admin");
};

module.exports.setRviewer =async(req,res)=>{//apoint to the the review
     if (!req.isAuthenticated()) {
       //chek req is not authenticated or not
       return res.redirect("/users/login"); //send to login form
     }
     if (req.user.isAdmin == false) {//if you are not admin go home page
       return res.redirect("/home");
     }
     if (req.body.Reviewer == req.body.Recipient) {//if revier and recipient are same go back
        return res.redirect("back");
     }
     try{
       let reviewer = await User.findById(req.body.Reviewer); //CHECK this reviewer are avliable or not
       if (!reviewer) {
         return res.redirect("back");
       }

       let recipient = await User.findById(req.body.Recipient); //finding recipient

       if (!recipient) {
         //CHECK this recipient are avliable or not
         return res.redirect("back");
       }

       reviewer.to.push(recipient);
       reviewer.save();

       recipient.from.push(reviewer);
       recipient.save();
       return res.redirect("back");
     }catch(e){
        console.log(" err in setreview functin in admin cotroler",e)//print the err in catch block
     }
   return res.redirect('back');
};
module.exports.newAdmin =async(req,res)=>{
    if (!req.isAuthenticated()) {
      //chek req is not authenticated or not
      return res.redirect("/users/login"); //send to login form
    }
    try {
    if (req.user.isAdmin == true) {
      let employe = await User.findById(req.body.newAdmin);//getting employe from mongodb 

      if (!employe) {
        return res.redirect("back");//if employe are not in database plese return
      }

      if (employe.isAdmin == true) {//if employe us already admin then goback
        return res.redirect("back");
      }

      if (employe.isAdmin == false) { ///making employe admin
        (employe.isAdmin = true), employe.save();

        return res.redirect("/admin/");
      }
    }

    } catch (e) {
      console.log(" err in newAdmin functin in admin cotroler", e); //print the err in catch block
    }
    return res.redirect("back");
    
    };
    
// views employees
module.exports.viewEmployees = async function (req, res) {
  try {//try block
    if (req.isAuthenticated()) {//chnoteck user is authenticated or 
      if (req.user.isAdmin) {
        let employees = await User.find({});//finding all emolyees from data base


        if (employees) {
          return res.render("employe", {//rendering employee
            title: "Employee",
            employees: employees,
          });
        }
      } else {
        console.log("user is not admin ");
        return res.redirect("/admin/");
      }
    } else {
      console.log("user not authenticated");
      return res.redirect("/users/login");
    }
  } catch (err) {//catch block
    console.log("Error in view employees controelr", err);
    return;
  }
};
//delete employees
module.exports.deleteEmployee = async (req, res)=> {
  
    try {
      if (req.isAuthenticated()) {
        if (req.user.isAdmin) {
          await User.deleteOne({ _id: req.params.id });//deletimg emp from mongodb
          return res.redirect("/admin/viewEmployees");
        }
      }
    } catch (err) {
      console.log("Error", err);//catch err
      return;
    }
  };
