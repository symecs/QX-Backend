const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema(
  {
    taxRate: {
      type: Number,
      required: true,
      default: 15,
    },
    shippingRate: {
      type: Number,
      required: true,
      default: 10,
    },
    freeShippingThreshold: {
      type: Number,
      required: true,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
