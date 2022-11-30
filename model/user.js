var mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
   username:{
    type: String,
    required:true,
   },
    email: {
      type: String,
      required:true,
    },
    password:{ type:String
    },
    password1:{
       type:String
    },
    isAdmin : {
      type : Boolean,
      required : true,
  },
  to : [     // i have to review whom
      {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User',
      }
  ],
  from : [    // recieved review from another people
      {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Review',
      }
  ]
  });
  
  const User= mongoose.model('User', UserSchema);
  module.exports =User;
  