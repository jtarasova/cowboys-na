const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const indexRouter = require('./src/routes/indexRouter');
const chatRouter = require('./src/routes/chatRouter');

const app = express();
app.enable('trust proxy');
app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views/'));

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  store: new FileStore({ path: './sessions' }), // хранилище сессий
  // store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
  key: 'sid', // ключ куки (название куки)
  secret: process.env.SECRET, // для шифрования id сессии
  resave: false, // сессия будет сохраняться заново только при изменениях
  saveUninitialized: false, // сохранение (или не сохранение) не инициализированной сессии
  // невозможно изменить куку с фронта
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: true,
    // secure: true,
    // sameSite: 'none',
  },
};

const sessionParser = session(sessionConfig);
app.use(sessionParser);

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userEmail = req.session?.userEmail;
  res.locals.userName = req.session?.userName;
  next();
});

app.use('/', indexRouter);
app.use('/chat', chatRouter);

// app.listen(PORT, () => console.log('Dobro'));

module.exports = { app, sessionParser };
