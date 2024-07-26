import uploadFeature from '@adminjs/upload'
import infoModel from '../../../server/common/db/model/information/info/info.model.js'
import cardModel from '../../../server/common/db/model/avtokran/card/card.model.js'
import { imgDir } from '../../uploadFeature.js'
import AdminJS from 'adminjs'
import { componentLoader } from '../../componentLoader.js'

const localProvider = {
	bucket: imgDir,
	baseUrl: '/Image',
}

const createInfoResource = () => ({
	resource: infoModel,
	options: {
		properties: {
			image: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			name: { isVisible: { list: true, filter: true, show: true, edit: true } },
			price_hour: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			minimum: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			price_shift: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			card: {
				type: 'reference',
				reference: 'Card', // Название модели Card
				isVisible: {
					list: true,
					edit: true,
					filter: true,
					show: true,
				},
			},
		},
		actions: {
			new: {
				after: async (response, request, context) => {
					const { record } = context
					if (record.isValid()) {
						const infoId = record.id()
						const cardId = record.param('card')

						if (cardId) {
							const card = await cardModel.findById(cardId)
							if (card) {
								card.info.push(infoId)
								await card.save()
							} else {
								console.log('Card is undefined ')
							}
						} else {
							console.log('cardId is undefined ')
						}
					}
					return response
				},
			},
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

export { createInfoResource }
