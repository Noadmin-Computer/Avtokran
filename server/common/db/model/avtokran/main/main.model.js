import mongoose from 'mongoose'

const { Schema } = mongoose

const MainSchema = new mongoose.Schema({
	image: String,
	text: String,
})

const mainModel = mongoose.model('Main', MainSchema)
export default mainModel
