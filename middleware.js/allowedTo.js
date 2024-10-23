module.exports = (...roles) => {
  return (req, res, next) => {
    console.log(req.currentUser.role);
    if (!roles.includes(req.currentUser.role)) {
      return next(res.json({ message: "user not authorized" }));
    }
    next();
  };
};
