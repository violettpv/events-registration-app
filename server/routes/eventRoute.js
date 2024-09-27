const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  registerParticipant,
  getParticipants,
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.get('/participants/:id', getParticipants);
router.post('/create', createEvent);
router.post('/register/:id', registerParticipant);

module.exports = router;
