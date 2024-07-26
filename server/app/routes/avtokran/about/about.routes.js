import { Router } from 'express'
import {
	aboutCreateHandler,
	aboutDeleteHandler,
	aboutGetHandler,
	aboutUpdateHandler,
} from '../../../handler/avtokran/about/about.handler.js'
import { aboutValidation } from '../../../middleware/avtokran/about/about.middleware.js'

const router = Router()

router
	.route('/')
	.get(aboutGetHandler)
	.post(aboutValidation, aboutCreateHandler)
	.delete(aboutDeleteHandler)
	.put(aboutUpdateHandler)

export default router
