import {
	createAboutService,
	deleteAboutByQueryService,
	getAboutByQueryService,
	updateAboutByQueryService,
} from '../../../../common/service/avotkran/about/about.service.js'

export async function aboutCreateHandler(request, response) {
	try {
		const data = request.body
		const res = await createAboutService(data)
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

export async function aboutGetHandler(request, response) {
	try {
		const get = await getAboutByQueryService()
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

export async function aboutDeleteHandler(request, response) {
	try {
		const data = request.body
		const deleted = await deleteAboutByQueryService(data)
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

export async function aboutUpdateHandler(request, response) {
	try {
		const data = request.body
		const update = await updateAboutByQueryService(data)
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
