const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const team = require('../models/team')
const User = require('../models/User')
router.get('/', ensureAuth, async (req,res) => {
    try{
        
        const members = await User.find({teamId: req.user.teamId}).lean()
        const teamn = await team.find({_id: req.user.teamId}).lean()
        res.render('team', {
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            members,
            displayName: teamn[0].displayName
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})
module.exports = router