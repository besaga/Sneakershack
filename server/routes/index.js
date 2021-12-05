const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

app.use("/auth", require("./auth.routes"))


module.exports = router;



// module.exports = app => {

//   //Base URLS
//   app.use('/', require('./base.routes.js'))
//   app.use("/auth", require("./auth.routes"))
//   app.use("/game", require("./game.routes"))
//   app.use("/pena", require("./pena.routes"))
//   app.use("/nodemailer", require("./nodemailer.routes"))


// }