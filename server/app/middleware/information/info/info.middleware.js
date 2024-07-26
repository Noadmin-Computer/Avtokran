import infoModel from '../../../../common/db/model/information/info/info.model.js'
import infoValidationSchema from '../../../../common/validation/information/info/info.validation.js'

export async function infoValidation(request, response, next) {
	try {
		const value = await infoValidationSchema.validateAsync(request.body)

		console.log(44, value)
		next()
	} catch (err) {
		response.json({
			status: 404,
			message: err.message,
		})
	}
}
