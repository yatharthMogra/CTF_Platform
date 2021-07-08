const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User')
let adminName = ['Yatharth', 'Yogesh']

router.get('/', ensureAuth, async (req,res) => {
    try{
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            const users = await User.find({ }).lean()
            res.render('email69420', {
                users,
            })
        }
        else{
            res.render('error/401')
        }  
        
        
        
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})
module.exports = router