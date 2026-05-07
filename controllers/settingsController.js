const Settings = require('../models/settingsModel');

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({});
    
    // If no settings document exists, create a default one
    if (!settings) {
      settings = await Settings.create({
        taxRate: 15,
        shippingRate: 10,
        freeShippingThreshold: 100,
      });
    }

    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = new Settings({});
    }

    settings.taxRate = req.body.taxRate !== undefined ? req.body.taxRate : settings.taxRate;
    settings.shippingRate = req.body.shippingRate !== undefined ? req.body.shippingRate : settings.shippingRate;
    settings.freeShippingThreshold = req.body.freeShippingThreshold !== undefined ? req.body.freeShippingThreshold : settings.freeShippingThreshold;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
