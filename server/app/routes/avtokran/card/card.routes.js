import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import cardModel from '../../../../common/db/model/avtokran/card/card.model.js'
import {
	cardCreateHandler,
	cardGetHandler,
	cardDeleteHandler,
	cardUpdateHandler,
} from '../../../handler/avtokran/card/card.handler.js'

const router = Router()

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const uploadPath = path.join(__dirname, '../../../../../web/project/Image')
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

// GET route for cards
// GET route for a single card with related info
router.get('/:cardId', async (req, res) => {
	try {
	  const { cardId } = req.params
  
	  // Validate cardId
	  if (!mongoose.isValidObjectId(cardId)) {
		return res.status(400).send('Invalid card ID')
	  }
  
	  // Fetch the card and populate related info
	  const card = await cardModel.findById(cardId).populate('info').exec()
	  if (!card) {
		return res.status(404).send('Card not found')
	  }
  
	  res.status(200).json({
		card,
		info: card.info
	  })
	} catch (err) {
	  console.error('Error fetching card:', err)
	  res.status(500).send('Error fetching card: ' + err.message)
	}
  }, cardGetHandler)
  

// POST route to create a new card with file upload
router.post(
	'/',
	upload.single('image'),
	async (req, res) => {
		try {
			const { name, info } = req.body
			const imagePath = req.file ? req.file.path : null

			const newCard = new cardModel({
				name: name,
				image: imagePath,
				info: JSON.parse(info), // Assuming 'info' is sent as a JSON string
			})

			await newCard.save()

			res.status(200).send('Card uploaded to MongoDB')
		} catch (err) {
			console.error('Error uploading card:', err)
			res.status(500).send('Error uploading card: ' + err.message)
		}
	},
	cardCreateHandler
)

// PUT route to update an existing card with file upload
router.put(
	'/:cardId',
	upload.single('image'),
	async (req, res) => {
		try {
			const { name, info } = req.body
			const imagePath = req.file ? req.file.path : null
			const cardId = req.params.cardId

			const card = await cardModel.findById(cardId)
			if (!card) {
				return res.status(404).send('Card not found')
			}

			// Delete previous image if it exists
			if (card.image && imagePath) {
				const imgPathToDelete = path.join(
					__dirname,
					'../../../../../web/project/Image',
					path.basename(card.image)
				)
				if (fs.existsSync(imgPathToDelete)) {
					fs.unlinkSync(imgPathToDelete)
					console.log('Previous image deleted successfully')
				} else {
					console.log('Previous image not found:', imgPathToDelete)
				}
			}

			// Update card details
			card.name = name
			if (imagePath) {
				card.image = imagePath
			}
			card.info = JSON.parse(info) // Assuming 'info' is sent as a JSON string

			await card.save()

			res.status(200).send('Card updated in MongoDB')
		} catch (err) {
			console.error('Error updating card:', err)
			res.status(500).send('Error updating card: ' + err.message)
		}
	},
	cardUpdateHandler
)

// DELETE route to delete an existing card
router.delete(
	'/:cardId',
	async (req, res) => {
		try {
			const { cardId } = req.params

			const card = await cardModel.findById(cardId)
			if (!card) {
				return res.status(404).send('Card not found.')
			}

			// Delete the image file if it exists
			if (card.image) {
				const imagePath = path.join(
					__dirname,
					'../../../../../web/project/Image',
					path.basename(card.image)
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

						await cardModel.findByIdAndDelete(cardId)
						res.status(200).send('Card and image deleted successfully.')
					})
				})
			} else {
				await cardModel.findByIdAndDelete(cardId)
				res.status(200).send('Card deleted successfully.')
			}
		} catch (err) {
			console.error('Error deleting card:', err)
			res.status(500).send('Internal Server Error: ' + err.message)
		}
	},
	cardDeleteHandler
)

export default router
