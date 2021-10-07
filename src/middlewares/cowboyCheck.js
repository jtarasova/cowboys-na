const cowboyCheck = (req, res, next) => {
  if (!(req.session.userType === 'cowboy')) {
    return res.redirect('/');
  }
  next();
};

module.exports = cowboyCheck;
