const express = require('express')
const { User } = require('../models/user')
const _ = require('lodash')

module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user) => {
        res.json(_.pick(user,['_id','username','email']))
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.login = (req,res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
    .then((user) =>{
        return user.generateToken()
    })
    .then((token) => {
        res.setHeader('x-auth',token).json()
    })
    .catch((err) => {
        res.json(err)
    })

}

module.exports.logout = (req,res) => {
    const { user,token } = req
    console.log("user",user)
    User.findByIdAndUpdate(user._id, { $pull : { tokens : { token : token }}})
    .then(() => {
        res.json({ notice : 'successfully logged out'})
    })
    .catch((err) =>{
        res.json(err)
    })
}