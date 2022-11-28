const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
    brandName: String,
    brandLogo: String,
    totalConnects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer"
    }],
    campaigns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    }],
    email: String,
    password: String
});

module.exports = mongoose.model("Brand", brandSchema);