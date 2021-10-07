const express = require('express');
// const captain = require('morgan'); //TODO:
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config(); //TODO:
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);
const indexRouter = require('./src/routes/indexRouter');

// const redisClient = redis.createClient();

const app = express();
const PORT = process.env.PORT ?? 3000; // nullish operator
// app.set('trust proxy', true);
app.enable('trust proxy'); //TODO:
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'src', 'views/'));

// console.log(path.join(process.env.PWD, 'src', 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

// app.use(captain('dev'));
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
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userEmail = req.session?.userEmail;
  next();
});

app.use('/', indexRouter);

app.listen(PORT, () => console.log('Dobro'));
