
import axios from 'axios';

const API_BASE_URL = 'https://assignment-1-event-management-system.onrender.com/';

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
