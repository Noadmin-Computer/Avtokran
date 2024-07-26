import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import mongoose from 'mongoose'
import { Database, Resource } from '@adminjs/mongoose'
import { createCardResource } from './resource/card/card.resource.js'
import { createMainResource } from './resource/main/main.resource.js'
import { createAboutResource } from './resource/about/about.resource.js'
import { createFooterResource } from './resource/footer/footer.resource.js'
import { createInfoResource } from './resource/info/info.resource.js'
import { uploadFeatureFor } from './uploadFeature.js'
import { componentLoader } from './componentLoader.js'

// Register the Mongoose adapter
AdminJS.registerAdapter({
	Database,
	Resource,
})

// Create AdminJS instance
const adminJS = new AdminJS({
	componentLoader,
	databases: [mongoose],
	resources: [
		createMainResource(),
		createCardResource(),
		createInfoResource(),
		createAboutResource(),
		createFooterResource(),
	],
	rootPath: '/admin',
	locale: {
		language: 'en',
		translations: {
			labels: {
				Card: 'cards',
				Main: 'main resources',
			},
		},
	},
})

// Build AdminJS router
adminJS.watch()

const adminRouter = AdminJSExpress.buildRouter(adminJS)

export { adminJS, adminRouter }
