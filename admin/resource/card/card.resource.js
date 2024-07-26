import cardModel from '../../../server/common/db/model/avtokran/card/card.model.js'
import { createInfoResource } from '../info/info.resource.js' // Import Info resource
import uploadFeature from '@adminjs/upload'
import { componentLoader } from '../../componentLoader.js'
import { imgDir } from '../../uploadFeature.js'

const localProvider = {
	bucket: imgDir,
	baseUrl: '/Image',
}

const createCardResource = () => ({
	resource: cardModel,
	options: {
		properties: {
			image: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			name: { isVisible: { list: true, filter: true, show: true, edit: true } },
			info: { isVisible: false },
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

export { createCardResource }
