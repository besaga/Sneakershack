const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const {isLoggedIn} = require("../middleware")

router.post('/signup', (req, res) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.status(400).json({ code: 400, message: 'Email already exixts' })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            User
                .create({ email, password: hashPass })
                .then((user) => res.status(200).json(user))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err: err.message }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.status(401).json({ code: 401, message: 'Username not registered' })
                return
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Incorrect password' })
                return
            }
            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((err) => res.status(200).json({ code: 200, message: 'Logout successful' }));
})

router.get("/isloggedin", (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

module.exports = router