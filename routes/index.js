const express = require('express')
const router = express.Router()


const Question = require('../models/Question')
const User = require('../models/User')
const World = require('../models/World')
const invite = require('../models/invite')
const team = require('../models/team')

// @desc   LOgin/Landing page
// @route  GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    } )
})


router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        
        if((await invite.find({email : req.user.email},{email : 1}).countDocuments()) != 0 && await (User.find({ teamId: { $exists: true }, _id: req.user.id }).countDocuments()) == 0){
            const teamn = await invite.find({ email: req.user.email })
            const teamx = await team.find({_id: teamn[0].teamId})
            res.render('dashboard/invite',{
                teamname: teamx[0].displayName,
                teamId: teamn[0].teamId,
            })
        }
        else if(await (User.find({ teamId: { $exists: true }, _id: req.user.id }).countDocuments()) != 0 && await (team.find({_id: req.user.teamId,ready:true}).countDocuments()) != 0){
        const worlds = await World.find({  }).sort({ worldNumber: 'asc' }).lean()
        const teams = await team.find({_id : req.user.teamId }).lean()
        res.render('dashboard/home', {
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            team: teams[0],
            worlds,
            teams,
        })}
        else if(await (User.find({ teamId: { $exists: true }, _id: req.user.id }).countDocuments()) == 0){
            res.render('dashboard/create',{
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            })
        }
        else {
        const members = await User.find({teamId: req.user.teamId}).lean()
        const teamn = await team.find({_id: req.user.teamId}).lean()
        res.render('dashboard/team', {
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            members,
            displayName: teamn[0].displayName
        })}
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
module.exports = router