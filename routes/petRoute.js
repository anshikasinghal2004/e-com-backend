const express = require("express");
const router = express.Router();
const Pet = require("../model/Pet");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      return cb(new Error("Error loading image"));
    }

    cb(null, true);
  },
});

router.post("/",upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    try {
      const { name, age, breed, color, description, imagelabel, category, cost } =
        req.body;
      const { image } = req.files;

      let imagePath = "";
      if (image && image.length > 0) {
        imagePath = image[0].path;
      }
      const createdPet = new Pet({
        name,
        age,
        breed,
        color,
        description,
        imagelabel,
        category,
        cost,
        image: imagePath,
      });

      await createdPet.save();

      res.status(201).json({ message: "Pet created successfully.", createdPet });
    } catch (err) {
      console.error("Error creating pet:", err);
      res.status(400).json(err);
    }
  }
);


router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json(err);
  }
});


router.get('/category', async (req, res) => {
  const { categoryId } = req.query; 
  try {
    const pets = await Pet.find({ category: categoryId }).populate('category');
    
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets by category ID:', error);
    res.status(500).json({ message: 'Error fetching pets', error });
  }
});


module.exports = router;
