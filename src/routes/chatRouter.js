const router = require('express').Router();
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
