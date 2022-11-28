const express = require("express");
const router = express.Router();
const {
  createBrand,
  createCampaign,
  getCampaigns,
  register,
  completeProfile,
  getProfile,
  getCampaignInfo,
  connectToCampaign,
  filterInfluencer,
  getMyProfile,
  editCampaign,
  deleteCampaign,
  login,
  createCategory,
  getCategories,
} = require("../controllers");
const { authCheck } = require("../middleware/auth");

// router.post("/create-brand", createBrand);
router.post("/create-campaign", authCheck, createCampaign);
router.get("/get-campaigns", authCheck, getCampaigns);
router.post("/register", register);
router.post("/complete-profile", authCheck, completeProfile);
router.post("/get-my-profile", authCheck, getMyProfile);
router.post("/get-campaign-info", authCheck, getCampaignInfo);
router.post("connect-to-campaign", authCheck, connectToCampaign);
router.post("/filter-influencer", authCheck, filterInfluencer);
router.post("/login", login);
router.post("/create-category", createCategory);
router.get("/get-categories", getCategories);
router.post("get-profile", authCheck, getProfile);
router.patch("/campaign", authCheck, editCampaign);
router.delete("/campaign", authCheck, deleteCampaign);

module.exports = router;
