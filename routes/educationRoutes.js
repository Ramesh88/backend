const express = require('express');
const router = express.Router();
const educationData = require('../data/educationData.json');

// Get all lessons
router.get('/lessons', (req, res) => {
  res.json(educationData.lessons);
});

// Get specific lesson
router.get('/lessons/:id', (req, res) => {
  const lesson = educationData.lessons.find(l => l.id === req.params.id);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ error: 'Lesson not found' });
  }
});

// Get quiz for lesson
router.get('/quiz/:lessonId', (req, res) => {
  const quiz = educationData.quizzes.find(q => q.lessonId === req.params.lessonId);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
});

// Submit quiz answer
router.post('/quiz/submit', (req, res) => {
  const { quizId, answers } = req.body;
  
  // Calculate score (simplified)
  const quiz = educationData.quizzes.find(q => q.id === quizId);
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  
  let correct = 0;
  quiz.questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      correct++;
    }
  });
  
  const score = (correct / quiz.questions.length) * 100;
  
  res.json({
    score,
    correct,
    total: quiz.questions.length,
    passed: score >= 70
  });
});

// Get fraud stories
router.get('/stories', (req, res) => {
  res.json(educationData.fraudStories);
});

module.exports = router;






