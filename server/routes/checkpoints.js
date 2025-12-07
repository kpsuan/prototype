const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

router.get('/', (req, res) => {
  const { category } = req.query;
  let checkpoints = [...mockData.checkpoints];
  
  if (category) checkpoints = checkpoints.filter(cp => cp.category === category);
  
  res.json({ success: true, count: checkpoints.length, data: checkpoints });
});

router.get('/:id', (req, res) => {
  const checkpoint = mockData.checkpoints.find(cp => cp.id === req.params.id);
  
  if (!checkpoint) {
    return res.status(404).json({ success: false, error: 'Checkpoint not found' });
  }
  
  res.json({ success: true, data: checkpoint });
});

module.exports = router;
