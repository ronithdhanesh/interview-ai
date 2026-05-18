const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added to the blacklisted tokens"]
    }
},{
    timestamps:true
})

const blacklistTokenModel = mongoose.model("blackListTokens", blacklistTokenSchema)

module.exports = blacklistTokenModel;