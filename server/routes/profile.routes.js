// const router = require("express").Router()
// const User = require("../models/User.model")
// const bcrypt = require("bcrypt")
// const bcryptSalt = 10


// router.get("/profile",(req,res) => {
//     User
//         .find()
//         .then (user =>res.status(200).json(user))
//         .catch (err=> res.status(500).json ({code: 500,message:"Error user",err}))

//     })

// router.get("/profile/:id",(req,res) => {
//     const { id } = req.params

//     User
//         .findById(id)
//         .then(user => res.status(200).json({user, message:"user"}))
//         .catch (err => res.status(500).json({code:500, message:"Error",err}))

//     })


// router.put("/editProfile/:id", (req, res) => {
//     const { id } = req.params
//     const { email, password, firstName, lastName, adress, phoneNumber } = req.body

//     User.findByIdAndUpdate(id, { email, password, firstName, lastName, adress, phoneNumber }, { new: true })
//         .then(updatedUser => res.json(updatedUser))
//         .catch(err => res.json({ err, errMessage: "Problema editando Coaster" }))
// })

// router.delete("/deleteProfile/:id", (req, res) => {
//     const { id } = req.params

//     Profile.findByIdAndDelete(id)
//         .then(deletedProfile => res.json({ deletedProfile }))
//         .catch(err => res.json({ err, errMessage: "Problema borrando Coaster" }))
// })


















// module.exports = router