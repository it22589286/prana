const mongoose = require('mongoose');

const requestItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

const RequestItemModel = mongoose.model('RequestItem', requestItemSchema);
module.exports = RequestItemModel;
