const express = require('express')
// 1. added a bracket 
const app = express()   
// 2. added the const 
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')


const artifactRoutes = require('./routes/artifacts.routes')
// 3. corrected the name
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

// fixed the spelling

connectToDB()

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('/artifacts', artifactRoutes)
app.use('/artifacts/:artifactId/reviews', reviewRoutes)


// 4. added the port 
    const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`⚔️ Royal Server listening on port ${PORT}`)
})