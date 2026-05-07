const express = require("express")
const router = express.Router()
const User = require("../models/user")


router
.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.send(users)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.patch('/changePassword', async (req, res) => {
    try{
        const user = await User.changePassword(req.body)
        res.send({message: "Password updated successfully" })
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

.delete('/deleteUser', async (req, res) => {
    try{
        const user = await User.deleteUser(req.body)
        res.send({message: "User deleted successfully" })
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

module.exports = router