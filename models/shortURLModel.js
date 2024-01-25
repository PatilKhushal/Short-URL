// imports
const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    id : {
        type : String,
        unique : true,
        required : true,
    },

    redirectURL : {
        type : String,
        required : true,
    },

    history : [{ time : {type : Date} }]
});

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },

        password : {
            type : String,
            required : true,
            unique : true
        }
    }
)

const urlModel = mongoose.model('shortURL', urlSchema);
const userModel = mongoose.model('users', userSchema);


// exports
module.exports = {
    urlModel,
    userModel
};