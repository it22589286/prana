// Assuming this file is located in a directory named 'controllers'
const Leave = require('../models/leavemodel');

const createLeave = async (req, res) => {
    try {
        console.log(req.body); // For debugging
        const leave = await Leave.create(req.body);
        return res.status(201).json(leave);
    } catch (error) {
        console.error(error); // For debugging
        return res.status(500).json({ error: error.message });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find();
        return res.status(200).json(leaves);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id);
        if (leave) {
            return res.status(200).json(leave);
        }
        return res.status(404).json({ error: "Leave not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByIdAndUpdate(id, req.body, { new: true });
        if (leave) {
            return res.status(200).json(leave);
        }
        return res.status(404).json({ error: "Leave not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByIdAndDelete(id);
        if (leave) {
            return res.status(200).json(leave);
        }
        return res.status(404).json({ error: "Leave not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLeave,
    getLeaves,
    getLeave,
    updateLeave,
    deleteLeave
};