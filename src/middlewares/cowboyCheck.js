const cowboyCheck = (req, res, next) => {
  console.log(req.session.userType);
  if (!(req.session.userType === 'cowboy')) {
    return res.redirect('/');
  }
  next();
};

module.exports = cowboyCheck;
