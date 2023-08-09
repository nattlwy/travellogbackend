const router = require('express').Router();
let Review = require('./models');

router.route('/').get((req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => res.status(400).json('Error: ' + err));
});


router.route('/:country').get((req, res) => {

    const countryParam = req.params.country; // Get the :country parameter from the URL

    // Construct a case-insensitive regular expression for the country parameter
    const countryRegex = new RegExp(countryParam, 'i');

    Review.find({ country: countryRegex }) // Use the regular expression in the query
        .then((reviews) => res.json(reviews))
        .catch((err) => res.status(400).json('Error: ' + err));

  });

// const reviewSchema = new Schema({
//     name: { type: String, required: true },
//     review: { type: String, required: true },
//     country: { type: String, required: true},
//     image: { type: URL, required: true}
//   });


router.route('/add').post(async (req, res) => {
  const name = req.body.name;
  const review = req.body.review;
  const country = req.body.country;
  const image = req.body.image;
  // create a new Activity object
  const newReview = await new Review({
    name,
    review,
    country,
    image
  });

  console.log(newReview);
  // save the new object (newActivity)
  newReview
    .save()
    .then(() => res.json('Review added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   console.log('just id' + req.params.id);
//   Activity.findById(req.params.id)
//     .then((activity) => res.json(activity))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

router.route('/delete/:id').delete(async (req, res) => {
  console.log('delete logged');
await Review.findByIdAndDelete(req.params.id)
    .then(() => res.json('Review deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(async (req, res) => {
  console.log(req.params.id);
await  Review.findById(req.params.id)
    .then((reviewforedit) => {
      reviewforedit.name = req.body.name;
      reviewforedit.review = req.body.review;
      reviewforedit.country = req.body.country;
      reviewforedit.image = req.body.image;


      reviewforedit
        .save()
        .then(() => res.json('Review updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
