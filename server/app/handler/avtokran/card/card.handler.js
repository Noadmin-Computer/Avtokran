import {
	createCardService,
	deleteCardByQueryService,
	getCardByQueryService,
	updateCardByQueryService,
} from '../../../../common/service/avotkran/card/card.service.js'

import cardModel from '../../../../common/db/model/avtokran/card/card.model.js'

export async function cardCreateHandler(request, response) {
	try {
		const data = request.body
		const res = await createCardService(data)
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

export async function cardGetHandler(request, response) {
	try {
		const cards = await cardModel.find().populate('info').exec()
		res.status(200).json(cards)
	} catch (err) {
		console.error('Error fetching cards:', err)
		res.status(500).send('Error fetching cards: ' + err.message)
	}
}

export async function cardDeleteHandler(request, response) {
	try {
		const data = request.body
		const deleted = await deleteCardByQueryService(data)
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

export async function cardUpdateHandler(request, response) {
	try {
		const data = request.body
		const update = await updateCardByQueryService(data)
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
