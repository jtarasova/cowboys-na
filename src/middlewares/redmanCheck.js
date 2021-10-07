const redmanCheck = (req, res, next) => {
  if (!(req.session.userType === 'redman')) {
    return res.redirect('/');
  }
  next();
};

module.exports = redmanCheck;
