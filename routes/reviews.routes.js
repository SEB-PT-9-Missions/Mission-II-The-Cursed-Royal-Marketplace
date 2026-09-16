const router = require("express").Router({ mergeParams: true });
const Artifact = require("../models/artifact.model");
const Review = require("../models/review.model");

router.post("/", async (req, res) => {
  try {
    const artifactId = req.body.artifactId || req.params.artifactId;
    const artifact = await Artifact.findById(artifactId);
    const review = await Review.create({
      message: req.body.message,
      rating: req.body.rating,
    });

    artifact.review;

    res.redirect(`/artifacts/${req.body.artifactId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/artifacts/${req.params.artifactId}`);
  }
});

router.delete("/:reviewId", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    await Artifact.findByIdAndUpdate(req.params.artifactId, {
      $pull: { reviews: req.params.reviewId },
    });
    res.redirect(`/artifacts/${req.params.artifactId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/artifacts/${req.params.artifactId}`);
  }
});

module.exports = router;
