import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import infoModel from '../../../../common/db/model/information/info/info.model.js'
import cardModel from '../../../../common/db/model/avtokran/card/card.model.js'

import {
	infoCreateHandler,
	infoGetHandler,
	infoDeleteHandler,
	infoUpdateHandler,
} from '../../../handler/information/info/info.handler.js'

const router = Router()

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const uploadPath = path.join(
				__dirname,
				'../../../../../web/project/Image'
			)
			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath, { recursive: true })
			}
			cb(null, uploadPath)
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + '-' + file.originalname)
		},
	}),
})

// GET route for infos
router.get('/', infoGetHandler)

// POST route to create a new info with file upload
router.post(
	'/',
	upload.single('image'),
	async (req, res) => {
		try {
			const { name, price_hour, minimum, price_shift, card } = req.body
			const imagePath = req.file ? req.file.path : null

			const newInfo = new infoModel({
				name: name,
				image: imagePath,
				price_hour: price_hour,
				minimum: minimum,
				price_shift: price_shift,
				card: card,
			})

			// Update the related card to include this info
			await cardModel.findByIdAndUpdate(cardId, {
				$push: { info: newInfo._id },
			})

			await newInfo.save()

			res.status(200).send('Info uploaded to MongoDB')
		} catch (err) {
			console.error('Error uploading info:', err)
			res.status(500).send('Error uploading Info: ' + err.message)
		}
	},
	infoCreateHandler
)

// PUT route to update an existing info with file upload
router.put(
	'/:infoId',
	upload.single('image'),
	async (req, res) => {
		try {
			const { name, price_hour, minimum, price_shift, card } = req.body

			const imagePath = req.file ? req.file.path : null
			const infoId = req.params.infoId

			const info = await infoModel.findById(infoId)
			if (!info) {
				return res.status(404).send('info not found')
			}

			// Delete previous image if it exists
			if (info.image && imagePath) {
				const imgPathToDelete = path.join(
					__dirname,
					'../../../../../web/card/Image',
					path.basename(info.image)
				)
				if (fs.existsSync(imgPathToDelete)) {
					fs.unlinkSync(imgPathToDelete)
					console.log('Previous image deleted successfully')
				} else {
					console.log('Previous image not found:', imgPathToDelete)
				}
			}

			// Update info details
			info.name = name
			info.price_hour = price_hour
			info.minimum = minimum
			info.price_shift = price_shift
			info.card = card

			if (imagePath) {
				info.image = imagePath
			}

			await info.save()

			res.status(200).send('Info updated in MongoDB')
		} catch (err) {
			console.error('Error updating Info:', err)
			res.status(500).send('Error updating info: ' + err.message)
		}
	},
	infoUpdateHandler
)

// DELETE route to delete an existing info
router.delete(
	'/:infoId',
	async (req, res) => {
		try {
			const { infoId } = req.params

			const info = await infoModel.findById(infoId)
			if (!info) {
				return res.status(404).send('info not found.')
			}

			// Delete the image file if it exists
			if (info.image) {
				const imagePath = path.join(
					__dirname,
					'../../../../../web/card/Image',
					path.basename(info.image)
				)
				fs.access(imagePath, fs.constants.F_OK, (accessErr) => {
					if (accessErr) {
						console.error('Image file does not exist:', accessErr)
						return res.status(404).send('Image file does not exist.')
					}

					fs.unlink(imagePath, async (unlinkErr) => {
						if (unlinkErr) {
							console.error('Error deleting image file:', unlinkErr)
							return res.status(500).send('Failed to delete image.')
						}

						await infoModel.findByIdAndDelete(infoId)
						res.status(200).send('Info and image deleted successfully.')
					})
				})
			} else {
				await infoModel.findByIdAndDelete(infoId)
				res.status(200).send('Info deleted successfully.')
			}
		} catch (err) {
			console.error('Error deleting info:', err)
			res.status(500).send('Internal Server Error: ' + err.message)
		}
	},
	infoDeleteHandler
)

export default router
