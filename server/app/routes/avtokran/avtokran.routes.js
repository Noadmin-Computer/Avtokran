import express from 'express'

// Import models
import cardModel from '../../../common/db/model/avtokran/card/card.model.js'
import mainModel from '../../../common/db/model/avtokran/main/main.model.js'
import infoModel from '../../../common/db/model/information/info/info.model.js'
import aboutModel from '../../../common/db/model/avtokran/about/about.model.js'
import footerModel from '../../../common/db/model/avtokran/footer/footer.model.js'

import { log } from '@adminjs/express'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		// Fetch all cards and info
		const staticFiles = {
			call: '/project/Image/call.svg',
			bg: '/project/Image/bg.png',
			map: './project/Image/map.svg',
			instagram: '/project/Image/instagram.svg ',
			telegram: '/project/Image/telegram.svg ',
			facebook: '/project/Image/facebook.svg ',
			footer: '/project/Image/footer.jpeg ',
		}
		const card = await cardModel.find()
		const info = await infoModel.find()
		const main = await mainModel.find()
		const about = await aboutModel.find()
		const footer = await footerModel.find()
		// Render the EJS template with the fetched data
		res.render('../web/index.ejs', {
			card, // Pass cards data to the template
			info, // Pass info data to the template
			main: main,
			card: card,
			about: about,
			footer: footer,
			staticFiles,
		})
	} catch (err) {
		console.error('Error fetching data:', err)
		res.status(500).send('Internal Server Error')
	}
})

export default router
