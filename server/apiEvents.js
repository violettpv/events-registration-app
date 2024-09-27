const Event = require('./models/eventModel.js');

const EVENT_API_URL =
  'https://api.json-generator.com/templates/izkJzQPtaJ3u/data?access_token=';
const EVENT_API_KEY = '19dsat3a2vft2kyyp391anii02zhwo8qi7f54om8';

module.exports = fetchAndStoreEvents = async () => {
  try {
    const response = await fetch(`${EVENT_API_URL}${EVENT_API_KEY}`);
    const resData = await response.json();

    console.log(resData);

    for (const event of resData) {
      const newEvent = new Event({
        title: event.title,
        organizer: event.organizer,
        datetime: event.datetime,
        description: event.description,
        isExternal: true,
      });

      await newEvent.save();
    }

    console.log('Events stored in database');
  } catch (error) {
    console.log(error);
  }
};
