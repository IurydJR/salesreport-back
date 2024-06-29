const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    product:{ type: String, required: true},
    category: { type: String, required: true},
    SalesDate:{ type: Date, required: true},
    Quantity: {type: Boolean, required: true}
});

module.exports = mongoose.model("Sale", SaleSchema);