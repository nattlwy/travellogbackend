const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://testuser:12345testuser@nodeexpress-jwt-test.8pysrbz.mongodb.net/travellogreview?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//creating schema
const reviewSchema = new Schema({
    name: { type: String, required: true },
    review: { type: String, required: true },
    country: { type: String, required: true},
    image: { type: URL, required: true}
  });

// defining model
const Reviewmodel = mongoose.model("Review", reviewSchema);

const newReview = new Review({
    name: "Julia Roberts",
    review: "I like the shrine in Japan so much",
    country: "Japan",
    image: "https://media.istockphoto.com/id/1060517676/photo/mount-fuji-at-lake-kawaguchiko-with-cherry-blossom-in-yamanashi-near-tokyo-japan.jpg?b=1&s=612x612&w=0&k=20&c=MWlcDzRLztejkMBXYxewlaBG4BZL00yYD1tAnIaAGjU="
  });

newReview.save()
.then(() => {
    console.log("New review added successfully");
    return Book.find();
})
.then((reviews) => {
    console.log(reviews);
    mongoose.connection.close();
})
.catch((err) => {
    console.log("Error adding new book:", err);
});
