const User = require("../models/User");
const { use } = require("../routes");

class UserController {
  // GET request for login page
  async showLogin(req, res) {
    res.render("login");
  }

  async login(req, res) {
    const { username, password } = req.body;
    console.log(username, " and ", password);
    try {
      const user = await User.authenticate(username, password);
      console.log(user, ": ", user.isAdmin);
      if (user) {
        if (user.isAdmin) {
          res.cookie("isAdmin", "true", { maxAge: 900000, httpOnly: true });
        }
        res.redirect("/dashboard"); // Redirect to dashboard page upon successful login
      } else {
        res.redirect("/fail"); // Redirect to fail page upon failed login
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.render("register", {
        error: "An error occurred during login please try again",
      });
    }
  }

  async register(req, res) {
    const { username, password } = req.body;

    try {
      await User.createUser(username, password);

      // Redirect to login page after successful registration
      res.redirect("/login");
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        // Render the register page with an error message for duplicate username
        return res.render("register", { error: "Username already exists" });
      } else {
        console.error("Registration error:", error);
        // Render the register page with a generic error message
        return res.render("register", {
          error: "An error occurred during registration",
        });
      }
    }
  }
}

module.exports = new UserController();
