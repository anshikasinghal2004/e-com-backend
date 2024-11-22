const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String },
    breed: { type: String },
    image: { type: String },
    imageLabel: { type: String,},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    cost: {type:String}
   
});
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;