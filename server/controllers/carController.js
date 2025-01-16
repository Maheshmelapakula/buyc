const Car = require('../models/Carmodel');

// Add a new car
exports.addCar = async (req, res) => {
  try {
    const { title, description, image, price, color, mileage, dealerId } = req.body;

    // Create a new car
    const newCar = new Car({
      title,
      description,
      image,
      price,
      color,
      mileage,
      dealerId,
    });

    await newCar.save();
    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(400).json({ message: 'Failed to add car', error });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
      const cars = await Car.find();  // Fetch all cars from the database
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
  };

// Get a single car by its ID
exports.getCarById = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(400).json({ message: 'Failed to fetch car', error });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const updatedData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(carId, updatedData, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(400).json({ message: 'Failed to update car', error });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(400).json({ message: 'Failed to delete car', error });
  }
};

// Delete multiple cars
exports.deleteMultipleCars = async (req, res) => {
  try {
    const { carIds } = req.body;

    if (!Array.isArray(carIds) || carIds.length === 0) {
      return res.status(400).json({ message: 'No car IDs provided' });
    }

    const deletedCars = await Car.deleteMany({ _id: { $in: carIds } });
    res.status(200).json({ message: `${deletedCars.deletedCount} cars deleted successfully` });
  } catch (error) {
    console.error('Error deleting cars:', error);
    res.status(400).json({ message: 'Failed to delete cars', error });
  }
};
