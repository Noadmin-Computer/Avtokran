import infoModel from '../../../db/model/information/info/info.model.js'

export async function getInfoByQueryService(query = {}) {
	try {
		const get = await infoModel.find(query, { __v: 0 })
		return get
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function createInfoService(data) {
	try {
		const create = await infoModel.create(data)
		return create
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function deleteInfoByQueryService(query) {
	try {
		const deleted = await infoModel.deleteOne(query)
		return deleted
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function updateInfoByQueryService(query) {
	try {
		const updated = await infoModel.updateOne(query)
		return updated
	} catch (error) {
		console.log(error.message)
		throw error
	}
}
