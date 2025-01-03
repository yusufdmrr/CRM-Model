//npm packages
const express = require('express')
const connectDB = require('./db/connect')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const app = express()
const path = require('path')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '/public')))

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
require('dotenv').config({
  path: envFile,
})

app.use(express.static(path.join(__dirname, 'public')));
const handlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const { initRoutes } = require('./routes/index')
const bodyParser = require('body-parser')
app.use(cors());

// app.use(compression())
// app.use(helmet())
// app.use(cookieParser())
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('x-powered-by')
require('./helpers/notificationCron')
require('./helpers/stock-cron')

initRoutes(app)
app.use(notFound)
app.use(handlerMiddleware)

const PORT = process.env.PORT || 5000
connectDB()

module.exports = { app, PORT }
