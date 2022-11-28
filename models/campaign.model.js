const mongoose = require("mongoose");
const campaignSchema = new mongoose.Schema({
  campaignPhoto: String,
  caption: String,
  totalInfluencerNeeded: Number,
  campaignBrandName: String,
  minimumRequiredFollowers: String,
  maximumRequiredFollowers: String,
  requiredAge: Number,
  typeOfCampaign: String,
  platform: String,
  requiredGender: String,
  campaignStartDate: String,
  campaignEndDate: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  shortlistedInfluencer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
    },
  ],
  submittedInfluencer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
    },
  ],
});

module.exports = mongoose.model("Campaign", campaignSchema);
