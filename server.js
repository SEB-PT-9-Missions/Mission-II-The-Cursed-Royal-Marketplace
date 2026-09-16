const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')

const artifactRoutes = require('./routes/artifacts.routes')
const reviewRoutes = require('./routes/reviews.routes')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🍃 Connected to the Royal Archives')
  } catch (error) {
    console.log('❌ The Royal Archives could not be opened:', error)
  }
}

connectToDB()

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('/artifacts', artifactRoutes)
app.use('/artifacts/:artifactId/reviews', reviewRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {

  console.log(`⚔️ Royal Server listening on port ${PORT}`)
})
