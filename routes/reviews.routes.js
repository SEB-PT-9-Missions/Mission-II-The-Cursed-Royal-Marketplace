const router = require('express').Router({ mergeParams: true })
const Artifact = require('../models/artifact.model')
const Review = require('../models/review.model')

router.post('/', async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.artifactId)
    const review = await Review.create({
      message: req.body.message,
      rating: req.body.rating,
    })

    artifact.reviews.push(review._id)
    await artifact.save()

    res.redirect(`/artifacts/${req.params.artifactId}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/artifacts/${req.params.artifactId}`)
  }
})

router.delete('/:reviewId', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId)
    await Artifact.findByIdAndUpdate(req.params.artifactId, {
    })
    res.redirect(`/artifacts/${req.params.artifactId}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/artifacts/${req.params.artifactId}`)
  }
})

module.exports = router
