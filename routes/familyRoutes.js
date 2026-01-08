const express = require('express');
const router = express.Router();
const familyData = require('../data/familyData.json');

// Get family members
router.get('/members', (req, res) => {
  res.json(familyData.familyMembers);
});

// Add family member
router.post('/members', (req, res) => {
  const { name, phone, relation, protectionLevel } = req.body;
  
  const newMember = {
    id: Date.now().toString(),
    name,
    phone,
    relation,
    protectionLevel,
    addedAt: new Date().toISOString(),
    alerts: []
  };
  
  res.json({
    success: true,
    member: newMember
  });
});

// Get alerts for family member
router.get('/alerts/:memberId', (req, res) => {
  const { memberId } = req.params;
  res.json(familyData.sampleAlerts);
});

// Send SOS alert
router.post('/sos', (req, res) => {
  const { memberId, type, details } = req.body;
  
  res.json({
    success: true,
    message: 'SOS alert sent to family members',
    alertId: Date.now().toString()
  });
});

module.exports = router;






