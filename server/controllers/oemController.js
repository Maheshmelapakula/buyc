// controllers/oemController.js
const { OEMModel } = require('../models/oemModel');

// Get the count of available OEM models
const getOEMCount = async (req, res) => {
  try {
    const count = await OEMModel.countDocuments({ available: true });  // Filter based on availability
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the OEM count', error });
  }
};

const addOEMModel = async (req, res) => {
    try {
      const { name, manufacturer, year, modelNumber, available } = req.body;
  
      // Create a new OEM model document
      const newOEMModel = new OEMModel({
        name,
        manufacturer,
        year,
        modelNumber,
        available,
      });
  
      // Save the model to the database
      await newOEMModel.save();
  
      res.status(201).json({ message: 'OEM model added successfully', newOEMModel });
    } catch (error) {
      res.status(500).json({ message: 'Error adding OEM model', error });
    }
  };
// Search for a specific OEM model
const searchOEMSpecs = async (req, res) => {
    try {
      const { name, year } = req.query;
  
      // Search by name and year
      const oemSpecs = await OEMModel.findOne({
        name: new RegExp(name, 'i'), // Case-insensitive match
        year: year,
      });
        
      if (!oemSpecs) {
        return res.status(404).json({ message: 'OEM specs not found' });
      }
  
      res.status(200).json({ message: 'OEM specs found', oemSpecs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching OEM specs', error });
    }
  };
module.exports = { getOEMCount,addOEMModel,searchOEMSpecs };
