const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControler = require("../controler/userControler");
router.get("/sinup", userControler.sinup);
router.get("/login", userControler.login);
// router.post(
//   "/create-session",
//   passport.authenticate("local", { failureRedirect: "/users/sinup" }),
//   userControler.createSession
// );

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sinup" }),
  (request, response) => {
    userControler.createSession(request, response);
  }
);

router.post("/create-user", userControler.create);
router.get("/logout", userControler.logout);

module.exports = router;
