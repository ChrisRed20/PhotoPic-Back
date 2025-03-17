const Session = require('../models/sessionModel');

// Create a new photo session
exports.createSession = async (req, res) => {
    try {
        const { photographer, client, date, location, accesCode } = req.body;

        if (!photographer || !date || !accesCode) {
            return res.status(400).send('Photographer, date and access code are required');
        }

        const session = new Session({ photographer, client, date, location, accesCode });
        await session.save();
        res.status(201).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all photo sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find({});
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single photo session by ID
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all photo sessions by client
exports.getSessionsByClient = async (req, res) => {
    try {
        const sessions = await Session.find({ client: req.params.clientID }).populate('photographer', 'email name lastName phone').populate('client', 'email name lastName');
        if (!sessions) {
            return res.status(404).send("No sessions found for this client");
        }
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all photo sessions by photographer
exports.getSessionsByPhotographer = async (req, res) => {
    try {
        const sessions = await Session.find({ photographer: req.params.photographerID }).populate('photographer', 'email name lastName phone').populate('client', 'email name lastName');
        if (!sessions) {
            return res.status(404).send("No sessions found for this photographer");
        }
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a photo session by ID
exports.updateSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a photo session by ID
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
};