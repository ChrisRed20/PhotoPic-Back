const Photographer = require('../models/photographerModel');

// Get all photographers
exports.getAllPhotographers = async (req, res) => {
    try {
        const photographers = await Photographer.find();
        res.status(200).json(photographers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single photographer by ID
exports.getPhotographerById = async (req, res) => {
    try {
        const photographer = await Photographer.findById(req.params.id);
        if (!photographer) return res.status(404).json({ message: 'Photographer not found' });
        res.status(200).json(photographer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a photographer by ID
exports.updatePhotographer = async (req, res) => {
    try {
        const updatedPhotographer = await Photographer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPhotographer) return res.status(404).json({ message: 'Photographer not found' });
        res.status(200).json(updatedPhotographer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a photographer by ID
exports.deletePhotographer = async (req, res) => {
    try {
        const deletedPhotographer = await Photographer.findByIdAndDelete(req.params.id);
        if (!deletedPhotographer) return res.status(404).json({ message: 'Photographer not found' });
        res.status(200).json({ message: 'Photographer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};