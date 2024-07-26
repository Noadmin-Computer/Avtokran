import aboutModel from '../../../../common/db/model/avtokran/about/about.model.js'
import aboutValidationSchema from '../../../../common/validation/avtokran/about/about.validation.js'

export async function aboutValidation(request, response, next) {
	try {
		const value = await aboutValidationSchema.validateAsync(request.body)

		console.log(44, value)
		next()
	} catch (err) {
		response.json({
			status: 404,
			message: err.message,
		})
	}
}
