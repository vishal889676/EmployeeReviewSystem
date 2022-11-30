const express =require('express');
const router=express.Router();
const adminControler=require('../controler/adminControler')
router.get('/',adminControler.adminPage);
router.get("/viewEmployees", adminControler.viewEmployees);

router.post("/setReviewers", adminControler.setRviewer);
router.get("/delete-employee/:id", adminControler.deleteEmployee);
router.post("/setReviewers", adminControler.setRviewer)


router.post('/newAdmin',adminControler.newAdmin);
module.exports = router;
