import path from 'path'
import * as url from 'url'
import { config } from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { ENV } from './common/config.js'
import ConnectDb from './common/db/connect.db.js'

// Configure environment variables
const dirname = url.fileURLToPath(new URL('.', import.meta.url))
config({ path: path.join(dirname, '../../.env') })

const PORT = process.env.PORT || 3000

// Create and configure Express application
const app = express()

// Static files middleware
app.use(express.static('project'))
app.use('/Style', express.static(path.join(dirname, '../web/project/Style')))
app.use('/Image', express.static(path.join(dirname, '../web/project/Image')))
app.use('/uploads',express.static(path.join(dirname, '../web/project/Image/uploads')))
app.use('/project', express.static(path.join(dirname, '../web/project')))
app.use(
	'/Plugins',
	express.static(path.join(dirname, '../web/project/Plugins'))
)

// Set view engine and body parser middleware
app.set('view engine', 'ejs')
app.set('views', path.join(dirname, '../web/'))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Import routes
import { adminRouter } from '../admin/admin.js'
import avtokranRoutes from '../server/app/routes/avtokran/avtokran.routes.js'
import infoRoutes from './app/routes/information/information.routes.js'


// Use AdminJS router from the separate file
app.use('/admin', adminRouter)
app.use('/', avtokranRoutes)
app.use('/info', infoRoutes)


async function start() {
	try {
		// Connect to MongoDB
		await ConnectDb()

		// Start the server
		app.listen(ENV.PORT, () => {
			console.log(`Server is listening at ${ENV.PORT}`)
		})
	} catch (error) {
		console.error('Failed to start the server:', error)
	}
}

start()
