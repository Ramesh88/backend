const express = require('express');
const router = express.Router();
const smsData = require('../data/smsData.json');

// Analyze SMS message
router.post('/analyze', (req, res) => {
  const { message, sender } = req.body;
  
  // Simulate SMS analysis - in future, this will call GPT-5.1 API
  const messageLower = message.toLowerCase();
  
  const detectedPattern = smsData.fraudPatterns.find(pattern => {
    return pattern.keywords.some(keyword => messageLower.includes(keyword.toLowerCase()));
  });
  
  if (detectedPattern) {
    res.json({
      isFraud: true,
      category: detectedPattern.category,
      riskLevel: detectedPattern.riskLevel,
      reason: detectedPattern.reason,
      recommendation: detectedPattern.recommendation
    });
  } else {
    res.json({
      isFraud: false,
      category: 'legitimate',
      riskLevel: 'low',
      reason: 'No suspicious patterns detected',
      recommendation: 'Message appears safe'
    });
  }
});

// Get SMS history
router.get('/history', (req, res) => {
  res.json(smsData.smsHistory);
});

module.exports = router;






