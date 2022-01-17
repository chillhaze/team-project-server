require('colors')
const mongoose = require('mongoose')

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful'.green)

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT.cyan}`.green)
    })
  })
  .catch(err => {
    console.log('Cannot create connection to DB'.red)
    console.log(err.message)
    process.exit(1)
  })
