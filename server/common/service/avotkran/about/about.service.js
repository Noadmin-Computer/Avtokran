import aboutModel from '../../../db/model/avtokran/about/about.model.js'

export async function getAboutByQueryService(query = {}) {
	try {
		const get = await aboutModel.find(query, { __v: 0 })
		return get
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function createAboutService(data) {
	try {
		const create = await aboutModel.create(data)
		return create
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function deleteAboutByQueryService(query) {
	try {
		const deleted = await aboutModel.deleteOne(query)
		return deleted
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function updateAboutByQueryService(query) {
	try {
		const updated = await aboutModel.updateOne(query)
		return updated
	} catch (error) {
		console.log(error.message)
		throw error
	}
}
