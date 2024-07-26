import Joi from 'joi'

export default Joi.object({
	image: Joi.string().min(3).max(30).required(),
	text: Joi.string().min(3).max(40).required(),
})
