const express = require("express");
const DoctorModel = require("../models/doctorModel");

const Doctorrouter = express.Router();

 
Doctorrouter.post("/appointments", async (req, res) => {
  try {
    const createDoctor = new DoctorModel(req.body);
    await createDoctor.save();
    res.status(201).json(createDoctor);
  } catch (error) {
    res.status(500).json({ error: " server error" });
  }
});

 


Doctorrouter.get("/appointments", async (req, res) => {
    try {
        let query = {};
    
         
        if (req.query.specialization) {
          query.specialization = req.query.specialization;
        }
    
     
        let sortOptions = { date: 1 };  
        if (req.query.sort === "desc") {
          sortOptions = { date: -1 };  
        }
    
        
        if (req.query.search) {
          query.name = { $regex: new RegExp(req.query.search, "i") };
        }
    
        const doctors = await DoctorModel.find(query).sort(sortOptions);
        res.json(doctors);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
});

 
Doctorrouter.put("/appointments/:id", async (req, res) => {
  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: " server error" });
  }
});

 
Doctorrouter.delete("/appointments/:id", async (req, res) => {
  try {
    const deletedDoctor = await DoctorModel.findOneAndDelete(req.params.id);
    res.json(deletedDoctor);

  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = Doctorrouter;
