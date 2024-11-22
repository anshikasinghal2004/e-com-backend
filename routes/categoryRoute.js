const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
        console.log("Category created:", newCategory);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(400).json({ message: "Error creating category", error: err.message });
    }
});

router.get('/', async(req ,res)=> {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories); 
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Error fetching category" }); 
    }
})

// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       const category = await Category.findById(id);
//       if (!category) {
//         return res.status(404).json({ message: "Category not found." });
//       }
//       res.status(200).json(category);
//     } catch (err) {
//       console.error("Error fetching category by ID:", err);
//       res.status(500).json({ message: "Error fetching category by ID.", err});
//     }
//   });
module.exports = router;
