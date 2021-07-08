const mongoose = require('mongoose')

const inviteSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('invite', inviteSchema)