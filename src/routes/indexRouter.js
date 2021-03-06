const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const cowboyCheck = require('../middlewares/cowboyCheck');
const redmanCheck = require('../middlewares/redmanCheck');

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/signUp', async (req, res) => {
  const { name, email, password: pass, type } = req.body;
  const saltRounds = 10;
  const password = await bcrypt.hash(pass, saltRounds);
  try {
    const currUser = await User.create({
      name,
      email,
      type,
      password,
    });
    req.session.userId = currUser.id;
    req.session.userType = currUser.type;
    req.session.userEmail = currUser.email;
    req.session.userName = currUser.name;
    res.redirect('/');
  } catch (err) {
    res.render('error', { message: 'Username or Email is not unique' });
  }
});
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    if (!currUser || !(await bcrypt.compare(password, currUser?.password))) {
      // В идеале, нужно написать пользователю, что логин/пароль - неверен.
      return res.render('error', { message: 'Wrong user or password' });
    }
    req.session.userType = currUser.type;
    req.session.userId = currUser.id;
    req.session.userEmail = currUser.email;
    req.session.userName = currUser.name;

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.get('/cowboys', cowboyCheck, (req, res) => {
  res.render('cowboy');
});

router.get('/redmen', redmanCheck, (req, res) => {
  res.render('redman');
});

router.get('/logout', (req, res) => {
  // Удаляем сессию с сервера (или базы данных, если сессия хранится там).
  req.session.destroy();
  // Говорим клиенту, чтобы он удалил куку.
  res.clearCookie('sid');
  res.redirect('/');
});
module.exports = router;
