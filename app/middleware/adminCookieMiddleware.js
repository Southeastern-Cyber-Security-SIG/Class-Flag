const checkAdminCookie = (req, res, next) => {
  if (req.cookies && req.cookies.isAdmin === "true") {
    req.isAdmin = true;
  } else {
    req.isAdmin = false;
  }
  next();
};

module.exports = checkAdminCookie;
