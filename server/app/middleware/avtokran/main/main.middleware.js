import mainModel from '../../../../common/db/model/avtokran/main/main.model.js'
import mainValidationSchema from '../../../../common/validation/avtokran/main/main.validation.js'

export async function mainValidation(request, response, next) {
	try {
		const value = await mainValidationSchema.validateAsync(request.body)

		console.log(44, value)
		next()
	} catch (err) {
		response.json({
			status: 404,
			message: err.message,
		})
	}
}
