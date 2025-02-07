// model file
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number}
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;