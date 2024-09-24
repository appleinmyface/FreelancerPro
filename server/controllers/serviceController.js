// server/controllers/serviceController.js
const Service = require('../models/Service');
const User = require('../models/User');

// Create a new service
exports.createService = async (req, res) => {
  const { title, description, price, createdBy } = req.body;

  if (!createdBy) {
    return res.status(400).json({ message: "createdBy is required" });
  }

  try {
    // Check if the user exists
    const userExists = await User.findById(createdBy);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const service = new Service({ title, description, price, createdBy });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('createdBy', 'username');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a service by id
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('createdBy', 'username');
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, { title, description, price }, { new: true });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Delete a service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
