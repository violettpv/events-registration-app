import axios from 'axios';
const API_URL = 'http://localhost:5000/api/events';

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
    const response = await axios.get(`${API_URL}/recommendations/all`);
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
};
