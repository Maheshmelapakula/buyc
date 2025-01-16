// car.js (Mongoose model for the car)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
//   dealerId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Dealer', // Reference to the Dealer model (assuming you have one)
//     required: true, // This makes the dealerId required
//   }
}, {
  timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
