import footerModel from '../../../server/common/db/model/avtokran/footer/footer.model.js'

const createFooterResource = () => ({
	resource: footerModel,
	options: {
		properties: {
			number: {
				isVisible: { list: true, filter: true, show: true, edit: true },
				isArray: true,
			},
			location: {
				isVisible: { list: true, filter: true, show: true, edit: true },
				isArray: true,
			},
			instagram: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			telegram: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
			facebook: {
				isVisible: { list: true, filter: true, show: true, edit: true },
			},
		},
	},
})

export { createFooterResource }
