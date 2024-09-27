import axios from 'axios';
const API_URL = 'http://localhost:5000/api/events';

// https://app.ticketmaster.com/discovery/v2/events?apikey=0K6l3XDxhrjACHwO3AsXvPr9VCmgi78M&locale=*
const EVENT_API_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const EVENT_API_KEY = '0K6l3XDxhrjACHwO3AsXvPr9VCmgi78M';

const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const getEvent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const getEventParticipants = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/participants/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const registerParticipant = async (id, participant) => {
  try {
    const response = await axios.post(`${API_URL}/register/${id}`, { participant });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const getEventsAPI = async () => {
  try {
    const response = await axios.get(
      `${EVENT_API_URL}/?apikey=${EVENT_API_KEY}&locale=*`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const createEvent = async (event) => {
  try {
    const response = await axios.post(`${API_URL}/create`, { event });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export {
  getAllEvents,
  getEvent,
  getEventParticipants,
  registerParticipant,
  getEventsAPI,
  createEvent,
};
