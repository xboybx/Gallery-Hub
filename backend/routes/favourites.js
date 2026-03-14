const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite');

// GET all favourites
router.get('/', async (req, res) => {
  try {
    const favourites = await Favourite.find().sort({ createdAt: -1 });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new favourite
router.post('/', async (req, res) => {
  const { id, author, width, height, url, download_url } = req.body;
  
  try {
    // Check if it already exists
    const exists = await Favourite.findOne({ id });
    if (exists) {
      return res.status(400).json({ message: 'Photo already in favourites' });
    }

    const favourite = new Favourite({
      id,
      author,
      width,
      height,
      url,
      download_url
    });

    const savedFavourite = await favourite.save();
    res.status(201).json(savedFavourite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a favourite by original photo id
router.delete('/:id', async (req, res) => {
  try {
    const deletedFavourite = await Favourite.findOneAndDelete({ id: req.params.id });
    if (!deletedFavourite) {
      return res.status(404).json({ message: 'Favourite not found' });
    }
    res.json({ message: 'Favourite removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
