import {
	createFooterService,
	deleteFooterByQueryService,
	getFooterByQueryService,
	updateFooterByQueryService,
} from '../../../../common/service/avotkran/footer/footer.service.js'

export async function footerCreateHandler(request, response) {
	try {
		const data = request.body
		const res = await createFooterService(data)
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

export async function footerGetHandler(request, response) {
	try {
		const get = await getFooterByQueryService()
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

export async function footerDeleteHandler(request, response) {
	try {
		const data = request.body
		const deleted = await deleteFooterByQueryService(data)
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

export async function footerUpdateHandler(request, response) {
	try {
		const data = request.body
		const update = await updateFooterByQueryService(data)
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
