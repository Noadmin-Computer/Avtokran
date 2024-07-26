import mongoose from 'mongoose'

const { Schema } = mongoose

const footerSchema = new mongoose.Schema({
	number: [{ type: String }],
	location: [{ type: String }],
	instagram: String,
	telegram: String,
	facebook: String,
})

const footerModel = mongoose.model('Footer', footerSchema)
export default footerModel
