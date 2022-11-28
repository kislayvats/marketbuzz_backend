const mongoose = require("mongoose");
const influencerSchema = new mongoose.Schema({
    infImage: String,
    infConnection: String,
    infFollowers: String,
    infFollowing: String,
    gender: String,
    age: Number,
    availability: String,
    name: String,
    lowerBudgetRange: String,
    instaId: String,
    youTubeId: String,
    uploadedVideos: [String],
    higherBudgetRange: String,
    state: String,
    city: String,
    collabs: Number,
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    email: String,
    password: String,
    subscribers: String
});

module.exports = mongoose.model("Influencer", influencerSchema);