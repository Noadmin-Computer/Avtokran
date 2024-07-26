import Joi from 'joi'

export default Joi.object({
	title: Joi.string().min(3).max(40).required(),
	description: Joi.string().min(3).max(350).required(),
})
