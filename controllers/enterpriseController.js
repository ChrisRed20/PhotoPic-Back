const Enterprise = require('../models/enterpriseModel');

// Obtener todas las empresas
exports.getAllEnterprises = async (req, res) => {
    try {
        const enterprises = await Enterprise.find();
        res.status(200).json(enterprises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una empresa por ID
exports.getEnterpriseById = async (req, res) => {
    try {
        const enterprise = await Enterprise.findById(req.params.id);
        if (!enterprise) return res.status(404).json({ message: 'Empresa no encontrada' });
        res.status(200).json(enterprise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva empresa
exports.createEnterprise = async (req, res) => {
    const enterprise = new Enterprise(req.body);
    try {
        const newEnterprise = await enterprise.save();
        res.status(201).json(newEnterprise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una empresa existente
exports.updateEnterprise = async (req, res) => {
    try {
        const updatedEnterprise = await Enterprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEnterprise) return res.status(404).json({ message: 'Empresa no encontrada' });
        res.status(200).json(updatedEnterprise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una empresa
exports.deleteEnterprise = async (req, res) => {
    try {
        const deletedEnterprise = await Enterprise.findByIdAndDelete(req.params.id);
        if (!deletedEnterprise) return res.status(404).json({ message: 'Empresa no encontrada' });
        res.status(200).json({ message: 'Empresa eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
