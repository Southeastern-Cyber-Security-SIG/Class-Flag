const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

// Home route
router.get("/", HomeController.index);

// GET route for login page
router.get("/login", UserController.showLogin);
//Login route
router.post("/login", UserController.login);

// GET route for fail page
router.get("/fail", (req, res) => {
  res.render("fail");
});

// Route for admin dashboard
router.get("/dashboard", (req, res) => {
  console.log("isAdmin? | ", req.isAdmin)
  if (req.isAdmin) {
    res.render("adminDashboard"); // Render admin dashboard for admin users
  } else {
    res.render("dashboard"); // Redirect regular users to their dashboard
  }
});
// // GET route for adminDashboard page
// router.get("/adminDashboard", (req, res) => {
//   res.render("adminDashboard");
// });

// // GET route for dashboard page
// router.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

// GET route for register page
router.get("/register", (req, res) => {
  res.render("register");
});

// POST route for registration
router.post("/register", UserController.register);

module.exports = router;
