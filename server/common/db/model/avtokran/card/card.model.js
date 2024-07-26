// card.model.js
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Info' }] // Define info as an array of ObjectIds referencing the Info model
});

const cardModel = mongoose.model('Card', CardSchema);
export default cardModel;
