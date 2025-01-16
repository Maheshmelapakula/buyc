// models/oemModel.js
const mongoose = require('mongoose');

const oemSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  year: { type: Number, required: true },
  modelNumber: { type: String, required: true },
  specs: {
    engine: { type: String },
    transmission: { type: String },
    fuelType: { type: String },
    mileage: { type: String },
    seatingCapacity: { type: Number },
    colorOptions: [String],
  },
  available: { type: Boolean, default: true },
});

const OEMModel = mongoose.model('oem', oemSchema);

module.exports = { OEMModel };
