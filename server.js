const express = require('express')
const app = express() //missing parentheses
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')

const artifactRoutes = require('./routes/artifacts.routes')
const reviewRoutes = require('./routes/reviews.routes')// spelling mistake: review => review(s)

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

connectToDB() // spelling mistake: connectToDB()

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('/artifacts', artifactRoutes)
app.use('/artifacts/:artifactId/reviews', reviewRoutes)

app.listen(3000, () => {
  console.log(`⚔️ Royal Server listening on 3000`)
})
