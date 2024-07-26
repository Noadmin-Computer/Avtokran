import mongoose from 'mongoose'

const { Schema } = mongoose

const aboutSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: [{ type: String, required: true }],
})

const aboutModel = mongoose.model('about', aboutSchema)
export default aboutModel
