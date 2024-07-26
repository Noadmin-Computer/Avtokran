import mainModel from '../../../server/common/db/model/avtokran/main/main.model.js'
import uploadFeature from '@adminjs/upload'
import { componentLoader } from '../../componentLoader.js'
import { imgDir } from '../../uploadFeature.js'

const localProvider = {
	bucket: imgDir,
	baseUrl: '/Image',
}

const createMainResource = () => ({
	resource: mainModel,
	options: {
		properties: {
			image: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			text: { isVisible: { list: true, filter: true, show: true, edit: true } },
		},
	},
	features: [
		uploadFeature({
			componentLoader,
			provider: { local: localProvider },
			properties: {
				key: 'image',
			},
			uploadPath: (record, filename) => {
				return `uploads/${filename}`
			},
		}),
	],
})

export { createMainResource }
