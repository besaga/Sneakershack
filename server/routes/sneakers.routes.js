const router = require("express").Router()
const Sneaker = require("../models/Sneaker.model")
const {isLoggedIn} = require("../middleware/index")

router.get("/", isLoggedIn, (req, res) => {
  console.log("holi, soy la ruta")
  Sneaker.find()
    .then(allSneakers => res.json(allSneakers))
    .catch(err => res.json({ err, errMessage: "Problema buscando Sneakers" }))
})

router.get("/:id", (req, res) => {
  const { id } = req.params

  Sneaker.findById(id)
    .then(theSneaker => res.json(theSneaker))
    .catch(err => res.json({ err, errMessage: "Problema buscando un Sneakers" }))
})

module.exports = router