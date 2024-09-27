const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  registerParticipant,
  getParticipants,
  getEventsAPI,
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.get('/participants/:id', getParticipants);
router.post('/create', createEvent);
router.post('/register/:id', registerParticipant);
router.get('/recommendations/all', getEventsAPI);

module.exports = router;
