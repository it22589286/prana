// models/leavemodel.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    empID: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);