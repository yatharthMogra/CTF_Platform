const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    ready: {
        type: Boolean,
        required: true,
        default: false
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    worldNumber: {
        type: Number,
        default: 0,
    },
    questionNumber: {
        type: Number,
        default: 1,
    },
    questionSolved: {
        type: Number,
        default: 0,
    },
    worldSolved: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    score: {
        type: Number,
        default: 0,
    },
    penalty: {
        type: Number,
        default: 0,
    },
    timeQues:{
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    q9: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('team', teamSchema)