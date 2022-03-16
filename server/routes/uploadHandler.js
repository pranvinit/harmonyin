const fs = require("fs");
const path = require("path");

const cloudinary = require("cloudinary");
const express = require("express");
const uploadHandler = express.Router();
const blogPostModel = require("../models/blogPostModel");

uploadHandler.post("/", async (req, res) => {
  const imgOne = req.files.imgOne;
  const imgTwo = req.files.imgTwo;
  const files = [imgOne, imgTwo];
  if (Object.keys(req.files).length > 2) {
    return res.status(400).json({ message: "please upload only two images" });
  }
  const maxSize = 1024 * 1024 * 2;
  const uploadSize = files[0].size + files[1].size;
  if (uploadSize > maxSize) {
    return res
      .status(400)
      .json({ message: "please upload images smaller than 2MB" });
  }
  const imagePaths = files.map((f) => {
    return path.join(__dirname, "../public/media" + f.name);
  });

  try {
    await files[0].mv(imagePaths[0]);
    await files[1].mv(imagePaths[1]);

    const imgOneUrl = await cloudinary.uploader.upload(imagePaths[0], {
      use_filename: true,
    });
    const imgTwoUrl = await cloudinary.uploader.upload(imagePaths[1], {
      use_filename: true,
    });

    fs.unlinkSync(imagePaths[0]);
    fs.unlinkSync(imagePaths[1]);

    res.status(200).json({
      imgOneUrl: imgOneUrl.secure_url,
      imgTwoUrl: imgTwoUrl.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = uploadHandler;
