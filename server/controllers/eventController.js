const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');
const Participant = require('../models/participantModel');

// @desc    Create new event
// @route   POST /api/events/create
// @access  Public
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, datetime, organizer } = req.body.event;

  if (!title || !description || !datetime || !organizer) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const event = await Event.create({
    title,
    description,
    datetime,
    organizer,
    isExternal: true, // for third-party API
  });

  if (event) {
    res.status(201).json({
      _id: event.id,
      title: event.title,
      description: event.description,
      datetime: event.datetime,
      organizer: event.organizer,
    });
  } else {
    res.status(400);
    throw new Error('Invalid event data');
  }
});

// @desc    Register participant to event
// @route   POST /api/events/register/:id
// @access  Public
const registerParticipant = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    const { fullname, email, dateOfBirth, heardAbout } = req.body.participant;

    if (!fullname || !email || !dateOfBirth || !heardAbout) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const participant = await Participant.create({
      fullname,
      email,
      dateOfBirth,
      heardAbout,
      event: event._id,
    });

    if (participant) {
      res.status(201).json({
        _id: participant.id,
        event: participant.event,
        fullname: participant.fullname,
        email: participant.email,
        dateOfBirth: participant.dateOfBirth,
        heardAbout: participant.heardAbout,
        createdAt: participant.createdAt,
      });
    } else {
      res.status(400);
      throw new Error('Invalid participant data');
    }
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  if (events) {
    res.status(200).json(events);
  } else {
    res.status(404);
    throw new Error('Events not found');
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Get all participants
// @route   GET /api/events/participants/:id (event ID)
// @access  Public
const getParticipants = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    const participants = await Participant.find({ event: event._id });

    if (participants) {
      res.status(200).json(participants);
    } else {
      res.status(404);
      throw new Error('Participants not found');
    }
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  registerParticipant,
  getParticipants,
};
