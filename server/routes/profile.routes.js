const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/:id",(req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.status(200).json({ user, message: "user" }))
    .catch((err) => res.status(500).json({ code: 500, message: "Error", err }));
});

router.post("/edit/:id", (req, res) => {
    
  const { id } = req.params;
  const { password, firstName, lastName, address, phoneNumber } = req.body;

  User.findById(id)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);

      let newParams = { firstName, lastName, address, phoneNumber };
      return User.findByIdAndUpdate(user.id, newParams, { new: true });

      // if (bcrypt.compareSync(password, user.password) === false) {
      //     res.status(403).json({code:403, message:"Contraseña incorrecta", err})
      // } else {
      //     let newParams = {firstName, lastName, address, phoneNumber}
      //     console.log(newParams, "<<<< Los new params son estos")
      //     // if (newPassword){
      //     //     const pwd = cleanText(newPassword)
      //     //     newParams.password = bcrypt.hashSync(pwd, salt)
      //     // }
      //     return User.findByIdAndUpdate(id, newParams ,{new: true})
      //     .then((user) => res.status(200).json({user, message:"user"}))
      //     .catch(err => res.status(500).json({code:500, message:"Error",err}))
      // }
    })
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res
        .status(404)
        .json({ code: 404, message: "Problema actualizando perfil", err })
    );
});

router.post("/delete/:id",(req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((deletedProfile) => res.json({ deletedProfile }))
    .catch((err) => res.json({ err, errMessage: "Problema borrando Profile" }));
});

module.exports = router;
