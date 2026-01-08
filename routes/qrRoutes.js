const express = require('express');
const router = express.Router();
const qrData = require('../data/qrData.json');

// Analyze QR code
router.post('/analyze', (req, res) => {
  const { qrContent, imageData } = req.body;
  
  // Simulate QR analysis - in future, this will use Vision models
  const contentLower = qrContent.toLowerCase();
  
  const fraudIndicator = qrData.fraudIndicators.find(indicator => {
    return indicator.patterns.some(pattern => contentLower.includes(pattern));
  });
  
  if (fraudIndicator) {
    res.json({
      isTampered: true,
      isSafe: false,
      fraudType: fraudIndicator.type,
      riskLevel: fraudIndicator.riskLevel,
      warning: fraudIndicator.warning,
      recommendation: fraudIndicator.recommendation
    });
  } else {
    res.json({
      isTampered: false,
      isSafe: true,
      fraudType: null,
      riskLevel: 'low',
      warning: null,
      recommendation: 'QR code appears legitimate'
    });
  }
});

// Verify GPay screenshot
router.post('/verify-payment', (req, res) => {
  const { imageData, amount, merchantName } = req.body;
  
  // Simulate payment verification - in future, will use Vision model
  // Random simulation for demo
  const isReal = Math.random() > 0.3;
  
  if (isReal) {
    res.json({
      isReal: true,
      confidence: 0.92,
      analysis: {
        screenshotAuthenticity: 'genuine',
        transactionId: 'verified',
        timestamp: 'valid',
        upiDetails: 'correct'
      },
      recommendation: 'Payment screenshot appears authentic'
    });
  } else {
    res.json({
      isReal: false,
      confidence: 0.85,
      analysis: {
        screenshotAuthenticity: 'suspicious',
        transactionId: 'not found',
        timestamp: 'edited',
        upiDetails: 'inconsistent'
      },
      recommendation: 'FAKE SCREENSHOT DETECTED - Do not accept payment'
    });
  }
});

module.exports = router;






