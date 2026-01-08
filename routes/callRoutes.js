const express = require('express');
const router = express.Router();
const callData = require('../data/callData.json');

// Analyze incoming call
router.post('/analyze', (req, res) => {
  const { phoneNumber, callerName } = req.body;
  
  // Simulate call analysis - in future, this will call OpenAI Whisper API
  const analysis = callData.scamPatterns.find(pattern => 
    phoneNumber.includes(pattern.pattern) || 
    (callerName && callerName.toLowerCase().includes(pattern.keyword))
  );
  
  if (analysis) {
    res.json({
      isScam: true,
      riskLevel: analysis.riskLevel,
      reason: analysis.reason,
      advice: analysis.advice
    });
  } else {
    res.json({
      isScam: false,
      riskLevel: 'low',
      reason: 'No suspicious patterns detected',
      advice: 'Call appears safe, but stay vigilant'
    });
  }
});

// Get call history with risk assessments
router.get('/history', (req, res) => {
  res.json(callData.callHistory);
});

// Get scam statistics
router.get('/stats', (req, res) => {
  res.json(callData.statistics);
});

module.exports = router;






