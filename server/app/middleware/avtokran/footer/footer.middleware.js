import footerModel from '../../../../common/db/model/avtokran/footer/footer.model.js'
import footerValidationSchema from '../../../../common/validation/avtokran/footer/footer.validation.js'

export async function footerValidation(request, response, next) {
	try {
		const value = await footerValidationSchema.validateAsync(request.body)

		console.log(44, value)
		next()
	} catch (err) {
		response.json({
			status: 404,
			message: err.message,
		})
	}
}
