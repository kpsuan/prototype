const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

router.get('/team', (req, res) => {
  res.json({ success: true, count: mockData.team.length, data: mockData.team });
});

router.get('/sections', (req, res) => {
  res.json({ success: true, count: mockData.sections.length, data: mockData.sections });
});

module.exports = router;
