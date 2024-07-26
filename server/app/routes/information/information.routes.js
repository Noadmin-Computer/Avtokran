import { Router } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { config } from 'dotenv'

// Import models
import cardModel from '../../../common/db/model/avtokran/card/card.model.js'
import infoModel from '../../../common/db/model/information/info/info.model.js'
import footerModel from '../../../common/db/model/avtokran/footer/footer.model.js'
import * as url from 'url'

const router = Router()

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// Render route for individual card
router.get('/:id', async (req, res) => {
	try {
		const isValidObjectId = mongoose.isValidObjectId(req.params.id)
		if (!isValidObjectId) {
			return res.status(400).send('Invalid card ID')
		}

		const staticFiles = {
			call: '/project/Image/call.svg',
			bg: '/project/Image/bg.png',
			map: '/project/Image/map.svg',
			instagram: '/project/Image/instagram.svg',
			telegram: '/project/Image/telegram.svg',
			facebook: '/project/Image/facebook.svg',
			footer: '/project/Image/footer.jpeg',
		}

		const card = await cardModel.findById(req.params.id).populate('info')
		const footer = await footerModel.find()
		if (!card) {
			return res.status(404).send('Card not found')
		}

		res.render('../web/product-inner.ejs', {
			staticFiles,
			cardModel: card,
			info: card.info || [],
			footer: footer,
		})
	} catch (err) {
		console.error('Error fetching card:', err)
		res.status(500).send('Internal Server Error')
	}
})

export default router
