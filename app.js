const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const authRouter = require('./routes/api/auth')
const transactionsRouter = require('./routes/api/transactions')
const categoriesRouter = require('./routes/api/categories')
const balanceRouter = require('./routes/api/balance')
const reportsRouter = require('./routes/api/reports')


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const iconsDir = path.join(__dirname, 'public', 'icons')
const avatarsDir = path.join(__dirname, 'public', 'avatars')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/icons', express.static(iconsDir))
app.use('/avatars', express.static(avatarsDir))
app.use('/api/auth', authRouter)
app.use('/api/balance', balanceRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/reports', reportsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
