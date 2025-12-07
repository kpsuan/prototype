const express = require('express');
const router = express.Router();

let responses = [];

router.get('/', (req, res) => {
  const { userId, questionId } = req.query;
  let filteredResponses = [...responses];
  
  if (userId) filteredResponses = filteredResponses.filter(r => r.userId === userId);
  if (questionId) filteredResponses = filteredResponses.filter(r => r.questionId === questionId);
  
  res.json({ success: true, count: filteredResponses.length, data: filteredResponses });
});

router.post('/', (req, res) => {
  const { userId, questionId, checkpointId, value } = req.body;
  
  if (!questionId) {
    return res.status(400).json({ success: false, error: 'Question ID is required' });
  }
  
  const response = {
    id: `resp_${Date.now()}`,
    userId: userId || 'anonymous',
    questionId,
    checkpointId,
    value,
    createdAt: new Date().toISOString()
  };
  
  const existingIndex = responses.findIndex(r => r.userId === response.userId && r.questionId === questionId);
  
  if (existingIndex !== -1) {
    responses[existingIndex] = { ...responses[existingIndex], ...response };
  } else {
    responses.push(response);
  }
  
  res.status(201).json({ success: true, data: response });
});

router.get('/summary/:userId', (req, res) => {
  const userResponses = responses.filter(r => r.userId === req.params.userId);
  res.json({ success: true, data: { userId: req.params.userId, totalResponses: userResponses.length, responses: userResponses }});
});

module.exports = router;
