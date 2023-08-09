
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://testuser:12345testuser@nodeexpress-jwt-test.8pysrbz.mongodb.net/travellogreview?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true   }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// import routes
const reviewRouter = require('./routes');

// adding /books to before all routes
app.use('/travelreviews', reviewRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
