// import React, { useState } from 'react';
// import { Box, VStack } from '@chakra-ui/react';
// import EventForm from '../components/EventForm';
// import EventList from '../components/EventList';

// const HomePage = () => {
//     const [refresh, setRefresh] = useState(false);

//     const handleSave = () => {
//         setRefresh(!refresh);
//     };

//     const token = localStorage.getItem('token');  // Retrieve token from localStorage

//     return (
//         <Box p={4}>
//             <VStack spacing={8} align="stretch">
//                 <EventForm token={token} onSave={handleSave} />
//                 <EventList />
//             </VStack>
//         </Box>
//     );
// };

// export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { Box, VStack } from '@chakra-ui/react';
// import EventForm from '../components/EventForm';
// import EventList from '../components/EventList';
// import { fetchEvents } from '../services/api';

// const HomePage = () => {
//     const [events, setEvents] = useState([]);
//     const [eventToEdit, setEventToEdit] = useState(null);
//     const [refresh, setRefresh] = useState(false);

//     useEffect(() => {
//         const loadEvents = async () => {
//             const response = await fetchEvents();
//             setEvents(response.data);
//         };
//         loadEvents();
//     }, [refresh]);

//     const handleSave = () => {
//         setRefresh(!refresh);
//         setEventToEdit(null); // Reset the form after saving
//     };

//     const handleEdit = (event) => {
//         setEventToEdit(event);
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={8} align="stretch">
//                 <EventForm token={localStorage.getItem('token')} onSave={handleSave} eventToEdit={eventToEdit} />
//                 <EventList events={events} onEdit={handleEdit} />
//             </VStack>
//         </Box>
//     );
// };

// export default HomePage;
// import React, { useState, useEffect } from 'react';
// import { Box, VStack } from '@chakra-ui/react';
// import EventForm from '../components/EventForm';
// import EventList from '../components/EventList';
// import { fetchEvents } from '../services/api';

// const HomePage = () => {
//     const [events, setEvents] = useState([]);
//     const [eventToEdit, setEventToEdit] = useState(null);
//     const [refresh, setRefresh] = useState(false);

//     useEffect(() => {
//         const loadEvents = async () => {
//             const response = await fetchEvents();
//             setEvents(response.data);
//         };
//         loadEvents();
//     }, [refresh]);

//     const handleSave = () => {
//         setRefresh(!refresh);
//         setEventToEdit(null); // Reset the form after saving
//     };

//     const handleEdit = (event) => {
//         setEventToEdit(event);
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={8} align="stretch">
//                 <EventForm token={localStorage.getItem('token')} onSave={handleSave} eventToEdit={eventToEdit} />
//                 <EventList events={events} onEdit={handleEdit} />
//             </VStack>
//         </Box>
//     );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { fetchEvents } from '../services/api';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            const response = await fetchEvents();
            setEvents(response.data);
        };
        loadEvents();
    }, [refresh]);

    const handleSave = () => {
        setRefresh(!refresh);
        setEventToEdit(null); // Reset the form after saving
    };

    const handleEdit = (event) => {
        setEventToEdit(event);
    };

    const handleDelete = (deletedEventId) => {
        setEvents(events.filter(event => event._id !== deletedEventId));
    };

    return (
        <Box p={4}>
            <VStack spacing={8} align="stretch">
                <EventForm token={localStorage.getItem('token')} onSave={handleSave} eventToEdit={eventToEdit} />
                <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
            </VStack>
        </Box>
    );
};

export default HomePage;
