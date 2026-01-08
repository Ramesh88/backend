const express = require('express');
const router = express.Router();
const linkData = require('../data/linkData.json');

// Analyze URL/Link
router.post('/analyze', (req, res) => {
  const { url } = req.body;
  
  // Simulate link analysis - in future, this will use GPT-5.1 Vision + URL analysis
  const urlLower = url.toLowerCase();
  
  const threat = linkData.threatIndicators.find(indicator => {
    return indicator.patterns.some(pattern => urlLower.includes(pattern));
  });
  
  if (threat) {
    res.json({
      isSafe: false,
      status: threat.status,
      riskLevel: threat.riskLevel,
      threats: threat.threats,
      recommendation: threat.recommendation
    });
  } else {
    res.json({
      isSafe: true,
      status: 'safe',
      riskLevel: 'low',
      threats: [],
      recommendation: 'Link appears safe to visit'
    });
  }
});

// Get known phishing domains
router.get('/phishing-domains', (req, res) => {
  res.json(linkData.knownPhishingDomains);
});

module.exports = router;






