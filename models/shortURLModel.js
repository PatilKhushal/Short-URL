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

const urlModel = mongoose.model('shortURL', urlSchema);

module.exports = urlModel;