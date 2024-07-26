import cardModel from '../../../db/model/avtokran/card/card.model.js'

export async function getCardByQueryService(query = {}) {
	try {
		const get = await cardModel.find(query, { __v: 0 })
		return get
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function createCardService(data) {
	try {
		const create = await cardModel.create(data)
		return create
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function deleteCardByQueryService(query) {
	try {
		const deleted = await cardModel.deleteOne(query)
		return deleted
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function updateCardByQueryService(query) {
	try {
		const updated = await cardModel.updateOne(query)
		return updated
	} catch (error) {
		console.log(error.message)
		throw error
	}
}
