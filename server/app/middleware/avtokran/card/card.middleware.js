import cardModel from '../../../../common/db/model/avtokran/card/card.model.js'
import cardValidationSchema from '../../../../common/validation/avtokran/card/card.validation.js'

export async function cardValidation(request, response, next) {
	try {
		const value = await cardValidationSchema.validateAsync(request.body)

		console.log(44, value)
		next()
	} catch (err) {
		response.json({
			status: 404,
			message: err.message,
		})
	}
}
