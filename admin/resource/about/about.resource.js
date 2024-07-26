import aboutModel from '../../../server/common/db/model/avtokran/about/about.model.js'

const createAboutResource = () => ({
	resource: aboutModel,
	options: {
		properties: {
			title: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			description: {
				isVisible: { list: true, filter: true, show: true, edit: true },
				type: 'textarea',
			},
		},
	},
})

export { createAboutResource }
