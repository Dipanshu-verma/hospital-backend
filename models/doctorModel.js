const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  image: String,
  specialization: {
    type: String,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
  },
  experience: Number,
  location: String,
  date: { type: Date, default: Date.now },
  slots: Number,
  fee: Number,
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = DoctorModel;
