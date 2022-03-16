require("dotenv").config();
const express = require("express");
const app = express();

// middleware imports
const cors = require("cors");
const fileUpload = require("express-fileupload");

// routes imports
const blogHandler = require("./routes/blogHandler");
const uploadsHandler = require("./routes/uploadHandler.js");
const blogContentHandler = require("./routes/blogContentHandler");
const blogAdminHandler = require("./routes/blogAdminHandler");
const authenticationHandler = require("./routes/authenticationHandler");
const addUserHandler = require("./routes/addUser");
const addComment = require("./routes/addComment");
const addRating = require("./routes/addRating");
const addFeedback = require("./routes/addFeedback");
const getFeedbacks = require("./routes/getFeedbacks");
const PORT = process.env.PORT || 5000;

// cloudinary specific
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// mongoose specific
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const blogPostModel = require("./models/blogPostModel");

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", () => {
  console.log("We are connected to the database");
});

// setting middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// using route parameters of Express for dynamic get requests
app.get("/posts/:_id", async (req, res) => {
  const id = req.params._id;
  try {
    const singlePost = await blogPostModel.find({ _id: id });
    res.status(200).json(singlePost[0]);
  } catch (err) {
    res.status(404).json({ message: "No Post with that fucking name" });
  }
});

app.get("/comments/:_id", async (req, res) => {
  const collectionId = req.params._id;
  try {
    connection.db.collection(collectionId, (err, match) => {
      match
        .find({})
        .sort({ _id: -1 })
        .toArray((err, data) => {
          res.status(200).json(data);
        });
    });
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
});

app.get("/category/:category", async (req, res) => {
  const cat = req.params.category;
  try {
    const categoryPosts = await blogPostModel
      .find({ category: cat })
      .sort({ _id: -1 });
    res.status(200).json(categoryPosts);
  } catch (err) {
    res.status(404).json({ message: "No Post with that fucking name" });
  }
});

// handling blog posts
app.use("/form", blogHandler);

// handling image uploads
app.use("/uploads", uploadsHandler);

app.use("/blogContent", blogContentHandler);

//blog admin posts
app.use("/blogAdminContent", blogAdminHandler);
//admin post end
//authentication section
app.use("/authentication", authenticationHandler);
//auth end

//sign-up section
app.use("/addUser", addUserHandler);
//sign-up end

//add comments on single-posts
app.use("/singlePost/comment", addComment);
//comment end

//add ratings on single-posts
app.use("/singlePost/rating", addRating);
//ratings end

//add feedback section
app.use("/feedback", addFeedback);
//feedback section end

//get feedbacks
app.use("/getfeedbacks", getFeedbacks);
//get feedback end

app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT}`)
);
