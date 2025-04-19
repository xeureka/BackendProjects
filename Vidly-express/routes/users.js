
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
// api end point = /api/users


router.post('/',async (req,res) => {

    let user = await Users.findOne({email: req.body.email})

    if (user){
        return res.status(400).send('User Already registered !')
    }

    try {


        const salt = await bcrypt.genSalt(10)

        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,salt)
        })

        

        await user.save()


        res.send(user)
        
    } catch (error) {
        console.error('Error Registering a user, ',error.message)
        res.status(500).send('Internal Server Error !')
    }

})


module.exports = router