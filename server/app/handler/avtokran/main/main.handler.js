import {
	createMainService,
	deleteMainByQueryService,
	getMainByQueryService,
	updateMainByQueryService,
} from '../../../../common/service/avotkran/main/main.service.js'

export async function mainCreateHandler(request, response) {
	try {
		const data = request.body
		const res = await createMainService(data)
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

export async function mainGetHandler(request, response) {
	try {
		const get = await getMainByQueryService()
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

export async function mainDeleteHandler(request, response) {
	try {
		const data = request.body
		const deleted = await deleteMainByQueryService(data)
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

export async function mainUpdateHandler(request, response) {
	try {
		const data = request.body
		const update = await updateMainByQueryService(data)
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
