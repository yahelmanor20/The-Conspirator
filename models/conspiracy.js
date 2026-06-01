const { text } = require('express')
const mongoose = require('mongoose')

const conspiracySchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    createAT:{
        type: Date,
        default : Date.now,
        immutable: true
    },
    likes: {
        type: Number,
        default : 0,
    },
    disLikes: {
        type: Number,
        default : 0,
    },
    comments:[
        {
            author: String,
            text: String,
            createAT:{
                type: Date,
                default : Date.now,
                immutable: true
                }
        }
    ]
    
})

module.exports = mongoose.model("Conspiracy", conspiracySchema);