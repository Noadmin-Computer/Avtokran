import {
	createInfoService,
	deleteInfoByQueryService,
	getInfoByQueryService,
	updateInfoByQueryService,
} from '../../../../common/service/information/info/info.service.js'

export async function infoCreateHandler(request, response) {
	try {
		const data = request.body
		const res = await createInfoService(data)
		return response.json({
			status: 200,
			message: 'Ok',
			data: res,
		})
	} catch (error) {
		response.json({
			status: 400,
			message: error.message,
		})
	}
}

export async function infoGetHandler(request, response) {
	try {
		const get = await getInfoByQueryService()
		return response.json({
			status: 200,
			message: 'ok',
			data: get,
		})
	} catch (error) {
		response.json({
			status: 400,
			message: error.message,
		})
	}
}

export async function infoDeleteHandler(request, response) {
	try {
		const data = request.body
		const deleted = await deleteInfoByQueryService(data)
		return response.json({
			status: 200,
			message: 'ok',
			data: deleted,
		})
	} catch (error) {
		response.json({
			status: 400,
			message: error.message,
		})
	}
}

export async function infoUpdateHandler(request, response) {
	try {
		const data = request.body
		const update = await updateInfoByQueryService(data)
		return response.json({
			status: 200,
			message: 'OK',
			data: update,
		})
	} catch (error) {
		response.json({
			status: 400,
			message: error.message,
		})
	}
}
