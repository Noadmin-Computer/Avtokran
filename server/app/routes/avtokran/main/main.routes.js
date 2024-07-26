import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import mainModel from '../../../../common/db/model/avtokran/main/main.model.js'
import {
	mainCreateHandler,
	mainGetHandler,
	mainDeleteHandler,
	mainUpdateHandler,
} from '../../../handler/avtokran/main/main.handler.js'

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
		filetext: (req, file, cb) => {
			cb(null, Date.now() + '-' + file.originaltext)
		},
	}),
})

// GET route for mains
router.get('/', mainGetHandler)

// POST route to create a new main with file upload
router.post(
	'/',
	upload.single('image'),
	async (req, res) => {
		try {
			const { text } = req.body
			const imagePath = req.file ? req.file.path : null

			const newMain = new mainModel({
				text: text,
			})

			await newMain.save()

			res.status(200).send('Main uploaded to MongoDB')
		} catch (err) {
			console.error('Error uploading main:', err)
			res.status(500).send('Error uploading main: ' + err.message)
		}
	},
	mainCreateHandler
)

// PUT route to update an existing main with file upload
router.put(
	'/:mainId',
	upload.single('image'),
	async (req, res) => {
		try {
			const { text } = req.body
			const imagePath = req.file ? req.file.path : null
			const mainId = req.params.mainId

			const main = await mainModel.findById(mainId)
			if (!main) {
				return res.status(404).send('main not found')
			}

			// Delete previous image if it exists
			if (main.image) {
				const imgPathToDelete = path.join(
					__dirname,
					'../../../../../web/project/Image',
					path.basetext(main.image)
				)
				if (fs.existsSync(imgPathToDelete)) {
					fs.unlinkSync(imgPathToDelete)
					console.log('Previous image deleted successfully')
				} else {
					console.log('Previous image not found:', imgPathToDelete)
				}
			}

			// Update main details
			main.text = text
			if (imagePath) {
				main.image = imagePath
			}

			await main.save()

			res.status(200).send('main updated in MongoDB')
		} catch (err) {
			console.error('Error updating main:', err)
			res.status(500).send('Error updating main: ' + err.message)
		}
	},
	mainUpdateHandler
)

// DELETE route to delete an existing main
router.delete(
	'/:mainId',
	async (req, res) => {
		try {
			const { mainId } = req.params

			const main = await mainModel.findById(mainId)
			if (!main) {
				return res.status(404).send('main not found.')
			}

			// Delete the image file if it exists
			const imagePath = path.join(
				__dirname,
				'../../../../../web/project/Image',
				path.basetext(main.image)
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

					await mainModel.findByIdAndDelete(mainId)
					res.status(200).send('main and image deleted successfully.')
				})
			})
		} catch (err) {
			console.error('Error deleting main:', err)
			res.status(500).send('Internal Server Error: ' + err.message)
		}
	},
	mainDeleteHandler
)

export default router
