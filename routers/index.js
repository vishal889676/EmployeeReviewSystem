const express =require('express');
const router=express.Router();
const userControler=require('../controler/userControler');


router.get('/home',userControler.home)

router.use("/users", require("./user"));
router.use("/admin", require("./admin"));
router.use("/review", require("./review"));
module.exports = router;