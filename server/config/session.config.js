const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = app => {
  app.use(
    session({
      secret: "sneakers",//process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        // sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI ||'mongodb+srv://sneakershack:sneakershack@cluster0.f83if.mongodb.net/test'
      })
    })
  );
};