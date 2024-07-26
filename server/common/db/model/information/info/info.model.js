// info.model.js
import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
    image: { type: String },
    name: String,
    price_hour: String,
    minimum: String,
    price_shift: String,
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' } // Reference to a single Card
});

const infoModel = mongoose.model('Info', InfoSchema);
export default infoModel;
