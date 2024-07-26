import Joi from 'joi'

export default Joi.object({
	image: Joi.string().min(3).max(30).required(),
	name: Joi.string().min(3).max(40).required(),
	info: Joi.array.items(
		Joi.object({
			image: Joi.string().min(3).max(30).required(),
			name: Joi.string().min(3).max(40).required(),
			price_hour: Joi.string().min(3).max(40).required(),
			minimum: Joi.string().min(3).max(40).required(),
			price_shift: Joi.string().min(3).max(40).required(),
		})
	),
})
