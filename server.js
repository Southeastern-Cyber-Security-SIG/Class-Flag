const express = require("express");
const path = require("path");
const app = express();
const checkAdminCookie = require("./app/middleware/adminCookieMiddleware");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set the view engine to use EJS (or any other view engine you prefer)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "app", "public")));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Apply the middleware to relevant routes
app.use(checkAdminCookie);

// Routes
const indexRoute = require("./app/routes/index");
app.use("/", indexRoute);

// Start the server
// const PORT = process.env.PORT || 3000;
const server = app.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:3000/");
  //console.log(`Server running on port ${PORT}`);
});
