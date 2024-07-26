import mongoose from 'mongoose'
import { ENV } from '../config.js'

export default async function connectDb() {
	try {
		mongoose.set('strictQuery', true) // Ensures compatibility with the latest versions
		await mongoose.connect(ENV.DB_URL) // Connect to the database
		console.log('connected') // Confirm successful connection
	} catch (error) {
		console.log(error.message) // Log the error message
		throw error // Re-throw the error to handle it elsewhere
	}
}
