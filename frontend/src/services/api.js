// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// export const registerUser = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);
// export const loginUser = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);
// export const fetchEvents = () => axios.get(`${API_BASE_URL}/events`);
// export const createEvent = (data, token) => axios.post(`${API_BASE_URL}/events`, data, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });
// export const fetchEventReport = (id, token) => axios.get(`${API_BASE_URL}/events/${id}/report`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     },
//     responseType: 'blob'
// });
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// export const registerUser = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);
// export const loginUser = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);
// export const fetchEvents = () => axios.get(`${API_BASE_URL}/events`);
// export const createEvent = (data, token) => axios.post(`${API_BASE_URL}/events`, data, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });
// export const fetchEventReport = (id, token) => axios.get(`${API_BASE_URL}/events/${id}/report`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     },
//     responseType: 'blob'
// });
import axios from 'axios';
//const API_BASE_URL = 'http://localhost:5000/api';
//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://assignment-1-event-management-system.onrender.com/api';

// Function to register a new user
export const registerUser = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);

// Function to log in a user
export const loginUser = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);

// Function to fetch all events
export const fetchEvents = () => axios.get(`${API_BASE_URL}/events`);

// Function to fetch a specific event by its ID
// export const fetchEventById = (id, token) => axios.get(`${API_BASE_URL}/events/${id}`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });
export const fetchEventById = (id, token) => {
    return axios.get(`${API_BASE_URL}/events/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


// Function to create a new event
export const createEvent = (data, token) => axios.post(`${API_BASE_URL}/events`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Function to fetch the event report in PDF format
export const fetchEventReport = (id, token) => axios.get(`${API_BASE_URL}/events/${id}/report`, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    responseType: 'blob'  // Important for handling binary data like PDFs
});

////////
// export const updateEvent = (id, data, token) => axios.put(`${API_BASE_URL}/events/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const deleteEvent = (id, token) => axios.delete(`${API_BASE_URL}/events/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
// });

export const registerParticipant = (eventId, sessionId, data, token) => axios.post(`${API_BASE_URL}/events/${eventId}/sessions/${sessionId}/register`, data, {
    headers: { Authorization: `Bearer ${token}` }
});

// api.js

// export const deleteEvent = (id, token) => axios.delete(`${API_BASE_URL}/events/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
// });




export const deleteEvent = (id, token) => axios.delete(`${API_BASE_URL}/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const updateEvent = (id, data, token) => {
    return axios.put(`${API_BASE_URL}/events/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
