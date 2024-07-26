import Joi from 'joi'

export default Joi.object({
	number: Joi.string().min(15).max(15).required(),
	location: Joi.string().min(3).max(150).required(),
	instagram: Joi.string().min(3).max(150).required(),
	telegram: Joi.string().min(3).max(150).required(),
	facebook: Joi.string().min(3).max(150).required(),
})
