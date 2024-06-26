class HomeController {
  async index(req, res) {
    res.cookie("isAdmin", "false", { maxAge: 900000, httpOnly: true });
    res.render("index", { message: "Hello, World!" }); // Renders the index view (index.ejs or index.html)
  }
}

module.exports = new HomeController();
