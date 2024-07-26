import { Router } from 'express'
import {
	footerCreateHandler,
	footerDeleteHandler,
	footerGetHandler,
	footerUpdateHandler,
} from '../../../handler/avtokran/footer/footer.handler.js'
import { footerValidation } from '../../../middleware/avtokran/footer/footer.middleware.js'

const router = Router()

router
	.route('/')
	.get(footerGetHandler)
	.post(footerValidation, footerCreateHandler)
	.delete(footerDeleteHandler)
	.put(footerUpdateHandler)

export default router
