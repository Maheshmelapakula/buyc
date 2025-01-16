const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Add a new car
router.post('/add', carController.addCar);

// Get all cars (removes the dealer filter)
router.get('/', carController.getAllCars);  // Adjusted route to get all cars

// Get a single car by its ID
router.get('/:carId', carController.getCarById);

// Update a car's details
router.put('/update/:carId', carController.updateCar);

// Delete a single car
router.delete('/delete/:carId', carController.deleteCar);

// Delete multiple cars
router.delete('/delete-multiple', carController.deleteMultipleCars);

module.exports = router;
