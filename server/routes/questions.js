const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

router.get('/', (req, res) => {
  const { section, type } = req.query;
  let questions = [...mockData.questions];
  
  if (section) questions = questions.filter(q => q.section === parseInt(section));
  if (type) questions = questions.filter(q => q.type === type);
  
  res.json({ success: true, count: questions.length, data: questions });
});

router.get('/:id', (req, res) => {
  const question = mockData.questions.find(q => q.id === req.params.id);
  
  if (!question) {
    return res.status(404).json({ success: false, error: 'Question not found' });
  }
  
  let responseData = { ...question };
  if (question.checkpointIds) {
    responseData.checkpoints = mockData.checkpoints.filter(cp => question.checkpointIds.includes(cp.id));
  }
  
  res.json({ success: true, data: responseData });
});

router.get('/section/:sectionId', (req, res) => {
  const sectionId = parseInt(req.params.sectionId);
  const questions = mockData.questions.filter(q => q.section === sectionId);
  const section = mockData.sections.find(s => s.id === sectionId);
  
  res.json({ success: true, section, count: questions.length, data: questions });
});

module.exports = router;
