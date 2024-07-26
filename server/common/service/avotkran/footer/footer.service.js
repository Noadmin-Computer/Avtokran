import footerModel from '../../../db/model/avtokran/footer/footer.model.js'

export async function getFooterByQueryService(query = {}) {
	try {
		const get = await footerModel.find(query, { __v: 0 })
		return get
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function createFooterService(data) {
	try {
		const create = await footerModel.create(data)
		return create
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function deleteFooterByQueryService(query) {
	try {
		const deleted = await footerModel.deleteOne(query)
		return deleted
	} catch (error) {
		console.log(error.message)
		throw error
	}
}

export async function updateFooterByQueryService(query) {
	try {
		const updated = await footerModel.updateOne(query)
		return updated
	} catch (error) {
		console.log(error.message)
		throw error
	}
}
