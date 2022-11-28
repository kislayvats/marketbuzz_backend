const { Campaign, Brand, Influencer, Category } = require("../models");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

module.exports.createCampaign = async (req, res) => {
  const newCampaign = await Campaign.create(req.body);
  const brand = await Brand.findByIdAndUpdate(
    req.userId,
    { $push: { campaigns: newCampaign } },
    { new: true }
  );
  res.status(httpStatus.OK).json({ success: true, newCampaign, brand });
};

// module.exports.createBrand = async (req, res) => {
//     const newBrand = await Brand.create(req.body);
//     res.status(httpStatus.OK).json({ success: true, newBrand });
// };

module.exports.getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({});
  res.status(httpStatus.OK).json({ success: true, campaigns });
};

module.exports.register = async (req, res) => {
  if (req.body.role === "influencer") {
    const influencer = await Influencer.create(req.body);
    const token = jwt.sign({ id: influencer._id }, "thisisnotagoodsecret", {
      expiresIn: "10000h",
    });
    res.status(httpStatus.OK).json({ success: true, token, user: influencer });
  } else {
    const brand = await Brand.create(req.body);
    const token = jwt.sign({ id: brand._id }, "thisisnotagoodsecret", {
      expiresIn: "10000h",
    });
    res.status(httpStatus.OK).json({ success: true, token, user: brand });
  }
};

module.exports.completeProfile = async (req, res) => {
  if (req.body.role === "influencer") {
    const influencer = await Influencer.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    );
    res.status(httpStatus.OK).json({ success: true, influencer });
  } else {
    const brand = await Brand.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    res.status(httpStatus.OK).json({ success: true, brand });
  }
};

module.exports.getMyProfile = async (req, res) => {
  console.log("Role of user", req.body.role);
  if (req.body.role === "influencer") {
    console.log("User Id", req.userId);
    const influencer = await Influencer.findById(req.userId);
    res.status(httpStatus.OK).json({ success: true, user: influencer });
  } else {
    const brand = await Brand.findById(req.userId);
    res.status(httpStatus.OK).json({ success: true, user: brand });
  }
};

module.exports.getProfile = async (req, res) => {
  if (req.body.role === "influencer") {
    const influencer = await Influencer.findById(req.body.id);
    res.status(httpStatus.OK).json({ success: true, influencer });
  } else {
    const brand = await Brand.findById(req.body.id);
    res.status(httpStatus.OK).json({ success: true, brand });
  }
};

module.exports.getCampaignInfo = async (req, res) => {
  const populateQuery = [
    { path: "submittedInfluencer", select: "_id name" },
    { path: "shortlistedInfluencer", select: "_id name" },
  ];
  const campaign = await Campaign.findById(req.body.campaignId).populate(
    populateQuery
  );
  res.status(httpStatus.OK).json({ success: true, campaign });
};

module.exports.connectToCampaign = async (req, res) => {
  await Campaign.findByIdAndUpdate(req.body.campaignId, {
    $push: { submittedInfluencer: req.userId },
  });
  res.status(httpStatus.OK).json({ success: true });
};

module.exports.filterInfluencer = async (req, res) => {
  const populateQuery = [
    { path: "submittedInfluencer", select: "_id name" },
    { path: "shortlistedInfluencer", select: "_id name" },
  ];
  const campaign = await Campaign.findByIdAndUpdate(
    req.body.campaignId,
    {
      $pull: { submittedInfluencer: req.body.influencerId },
      $push: { shortlistedInfluencer: req.body.influencerId },
    },
    { new: true }
  ).populate(populateQuery);
  const brand = await Brand.findByIdAndUpdate(
    req.userId,
    { $push: { totalConnects: req.body.influencerId } },
    { new: true }
  );
  res.status(httpStatus.OK).json({ success: true, brand, campaign });
};

module.exports.login = async (req, res) => {
  if (req.body.role === "influencer") {
    const influencer = await Influencer.findOne({ email: req.body.email });
    if (influencer?.password === req.body.password)
      res.status(httpStatus.OK).json({ success: true, influencer });
    else
      res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "Incorrect email or password." });
  } else {
    const brand = await Brand.findOne({ email: req.body.email });
    if (brand.password === req.body.password)
      res.status(httpStatus.OK).json({ success: true, brand });
    else
      res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "Incorrect email or password." });
  }
};

module.exports.editCampaign = async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(
    req.body.campaignId,
    req.body,
    { new: true }
  );
  res.status(httpStatus.OK).json({ success: true, campaign });
};

module.exports.deleteCampaign = async (req, res) => {
  await Campaign.findByIdAndDelete(req.body.campaignId);
  res.status(httpStatus.OK).json({ success: true });
};

module.exports.createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  console.log(req.body);
  res.status(httpStatus.OK).json({ success: true, newCategory });
};

module.exports.getCategories = async (req, res) => {
  const categories = await Category.find({});
  console.log(req.body);
  res.status(httpStatus.OK).json({ success: true, categories });
};
