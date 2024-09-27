const mongoose = require('mongoose');

const participantSchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events',
      required: [true, 'Participant must be associated with an event.'],
    },
    fullname: {
      type: String,
      required: [true, 'Please enter your full name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please enter your date of birth.'],
    },
    heardAbout: {
      type: String,
      required: [true, 'Please select how you heard about the event.'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', participantSchema);
