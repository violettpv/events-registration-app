# Events Registation App

Regular pagination is implemented in the Events component.
Infinite scrolling is implemented in the Recommendations component (with third-party API events).

server/apiEvents.js fetches the list of events from an API and stores them in db. In index.js this method is called every hour.
