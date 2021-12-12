const router = require("express").Router();

module.exports = app => {
  app.use("/api/auth", require("./auth.routes"));
  app.use("/api/cart", require("./cart.routes"));
  app.use("/api/profile", require("./profile.routes"));
  app.use("/api/sneakers", require("./sneakers.routes"));
  app.use("/api/invoice", require("./invoice.routes"));

}
