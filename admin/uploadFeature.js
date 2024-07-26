import uploadFeature from '@adminjs/upload'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import * as url from 'url'
import { componentLoader } from './componentLoader.js'

// Directory setup
const dirname = url.fileURLToPath(new URL('.', import.meta.url))
export const imgDir = path.join(dirname, '../web/project/Image')

if (!fs.existsSync(imgDir)) {
	fs.mkdirSync(imgDir, { recursive: true })
}

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, imgDir)
	},
	filename: (req, file, cb) => {
		const fileName = Date.now() + '-' + file.originalname
		cb(null, fileName)
	},
})

const upload = multer({ storage })

const uploadFeatureFor = (name, multiple = false) =>
	uploadFeature({
		componentLoader,
		provider: {
			local: {
				bucket: imgDir,
				baseUrl: '/Image',
			},
		},
		multiple,
		properties: {
			file: name ? `${name}.file` : 'file',
			filePath: name ? `${name}.filePath` : 'filePath',
			filesToDelete: name ? `${name}.filesToDelete` : 'filesToDelete',
			key: name ? `${name}.key` : 'key',
			mimeType: name ? `${name}.mime` : 'mime',
			bucket: name ? `${name}.bucket` : 'bucket',
			size: name ? `${name}.size` : 'size',
		},
		 uploadPath : (record, filename) => {
			return `uploads/${filename}`
		},
		afterUpload: async (record, { file, filePath }) => {
			try {
				if (name) {
					// Ensure the correct field is updated
					const relativePath = filePath.replace('/Image', '') // Adjust if necessary
					console.log(
						'Updating record with field:',
						name,
						'and path:',
						relativePath
					) // Debugging line
					record.set({ [name]: relativePath })
				}
				await record.save()
				console.log(`Updated record with ${name}: ${filePath}`)
			} catch (error) {
				console.error('Error updating record with file path:', error)
			}
		},
	})

export { uploadFeatureFor }
