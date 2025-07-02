const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Get all items (admin and user)
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create item (admin only)
router.post('/', auth, role('admin'), async (req, res) => {
  const { name, quantity, description } = req.body;
  try {
    const item = new Item({ name, quantity, description });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item (admin only)
router.put('/:id', auth, role('admin'), async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete item (admin only)
router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 