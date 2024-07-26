import mainModel from '../../../db/model/avtokran/main/main.model.js'

export async function getMainByQueryService(query = {}) {
	try {
		const get = await mainModel.find(query, { __v: 0 })
		return get
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function createMainService(data) {
	try {
		const create = await mainModel.create(data)
		return create
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function deleteMainByQueryService(query) {
	try {
		const deleted = await mainModel.deleteOne(query)
		return deleted
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function updateMainByQueryService(query) {
	try {
		const updated = await mainModel.updateOne(query)
		return updated
	} catch (error) {
		console.log(error.message)
		throw error
	}
}
