const Usuario = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await Usuario.find();
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id);
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}