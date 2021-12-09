const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//meter middleware para ver que el usuario es el registrado
router.get("/:id",(req,res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.status(200).json({user, message:"user"}))
        .catch (err => res.status(500).json({code:500, message:"Error",err}))

})

//meter middleware para comprobar que el usuario es el registrado
router.post("/edit/:id", (req, res) => {
    const { id } = req.params
    const { email, password, firstName, lastName, adress, phoneNumber } = req.body

    User.findByIdAndUpdate(id, { email, password, firstName, lastName, adress, phoneNumber }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Problema editando Profile" }))
})

//Meter middleware para comprobar que es admin
router.post("/delete/:id", (req, res) => {
    const { id } = req.params

    User.findByIdAndDelete(id)
        .then(deletedProfile => res.json({ deletedProfile }))
        .catch(err => res.json({ err, errMessage: "Problema borrando Profile" }))
})


module.exports = router