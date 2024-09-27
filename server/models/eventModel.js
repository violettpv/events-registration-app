const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title.'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description.'],
    },
    datetime: {
      type: Date,
      required: [true, 'Please add a date and time.'],
    },
    organizer: {
      type: String,
      required: [true, 'Please add an organizer.'],
    },
    isExternal: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('events', eventSchema);
