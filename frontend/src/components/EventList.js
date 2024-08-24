// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
// import { fetchEvents } from '../services/api';
// import { Link } from 'react-router-dom';

// const EventList = () => {
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         const loadEvents = async () => {
//             const response = await fetchEvents();
//             setEvents(response.data);
//         };
//         loadEvents();
//     }, []);

//     return (
//         <Box p={4}>
//             <Heading size="lg" mb={4}>Events</Heading>
//             <VStack spacing={4} align="stretch">
//                 {events.map(event => (
//                     <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
//                         <Heading size="md">{event.name}</Heading>
//                         <Text>{event.description}</Text>
//                         <Link to={`/events/${event._id}`}>
//                             <Button mt={2} colorScheme="teal">View Details</Button>
//                         </Link>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default EventList;
// EventList.js

// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
// import { fetchEvents, deleteEvent } from '../services/api';
// import { Link } from 'react-router-dom';

// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage

//     useEffect(() => {
//         const loadEvents = async () => {
//             try {
//                 const response = await fetchEvents();
//                 setEvents(response.data);
//             } catch (error) {
//                 setError('Failed to load events. Please try again later.');
//             }
//         };
//         loadEvents();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await deleteEvent(id, token);
//             setEvents(events.filter(event => event._id !== id));
//         } catch (error) {
//             setError('Failed to delete event. Please try again later.');
//         }
//     };

//     return (
//         <Box p={4}>
//             <Heading size="lg" mb={4}>Events</Heading>
//             {error && <Text color="red.500">{error}</Text>}
//             <VStack spacing={4} align="stretch">
//                 {events.map(event => (
//                     <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
//                         <Heading size="md">{event.name}</Heading>
//                         <Text>{event.description}</Text>
//                         <Link to={`/events/${event._id}`}>
//                             <Button mt={2} colorScheme="teal">View Details</Button>
//                         </Link>
//                         <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(event._id)}>Delete</Button>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default EventList;

// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Button, Spinner, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
// import { fetchEvents, deleteEvent } from '../services/api';
// import { Link } from 'react-router-dom';

// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const toast = useToast();
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const loadEvents = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchEvents();
//                 setEvents(response.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Failed to load events. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadEvents();
//     }, []);

//     const handleDelete = async () => {
//         setDeleting(true);
//         try {
//             await deleteEvent(selectedEvent._id, token);
//             setEvents(events.filter(event => event._id !== selectedEvent._id));
//             toast({
//                 title: "Event deleted.",
//                 description: "The event has been successfully deleted.",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             setIsDialogOpen(false);
//             setSelectedEvent(null);
//         } catch (error) {
//             setError('Failed to delete event. Please try again later.');
//             toast({
//                 title: "Error",
//                 description: "Failed to delete event. Please try again later.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } finally {
//             setDeleting(false);
//         }
//     };

//     const openDeleteDialog = (event) => {
//         setSelectedEvent(event);
//         setIsDialogOpen(true);
//     };

//     const closeDeleteDialog = () => {
//         setSelectedEvent(null);
//         setIsDialogOpen(false);
//     };

//     return (
//         <Box p={4}>
//             <Heading size="lg" mb={4}>Events</Heading>
//             {loading ? (
//                 <Spinner size="xl" />
//             ) : error ? (
//                 <Text color="red.500">{error}</Text>
//             ) : (
//                 <VStack spacing={4} align="stretch">
//                     {events.map(event => (
//                         <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
//                             <Heading size="md">{event.name}</Heading>
//                             <Text>{event.description}</Text>
//                             <Link to={`/events/${event._id}`}>
//                                 <Button mt={2} colorScheme="teal">View Details</Button>
//                             </Link>
//                             <Button mt={2} ml={2} colorScheme="red" onClick={() => openDeleteDialog(event)}>Delete</Button>
//                         </Box>
//                     ))}
//                 </VStack>
//             )}

//             <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={null} onClose={closeDeleteDialog}>
//                 <AlertDialogOverlay>
//                     <AlertDialogContent>
//                         <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                             Delete Event
//                         </AlertDialogHeader>
//                         <AlertDialogBody>
//                             Are you sure you want to delete this event? This action cannot be undone.
//                         </AlertDialogBody>
//                         <AlertDialogFooter>
//                             <Button onClick={closeDeleteDialog} disabled={deleting}>
//                                 Cancel
//                             </Button>
//                             <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={deleting}>
//                                 Delete
//                             </Button>
//                         </AlertDialogFooter>
//                     </AlertDialogContent>
//                 </AlertDialogOverlay>
//             </AlertDialog>
//         </Box>
//     );
// };

// export default EventList;
// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Button, Spinner, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
// import { fetchEvents, deleteEvent } from '../services/api';
// import { Link, useNavigate } from 'react-router-dom';

// const EventList = () => {
    
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const loadEvents = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetchEvents();
//                 setEvents(response.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Failed to load events. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadEvents();
//     }, []);

//     const handleDelete = async () => {
//         setDeleting(true);
//         try {
//             await deleteEvent(selectedEvent._id, token);
//             setEvents(events.filter(event => event._id !== selectedEvent._id));
//             toast({
//                 title: "Event deleted.",
//                 description: "The event has been successfully deleted.",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             setIsDialogOpen(false);
//             setSelectedEvent(null);
//         } catch (error) {
//             setError('Failed to delete event. Please try again later.');
//             toast({
//                 title: "Error",
//                 description: "Failed to delete event. Please try again later.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } finally {
//             setDeleting(false);
//         }
//     };

//     const openDeleteDialog = (event) => {
//         setSelectedEvent(event);
//         setIsDialogOpen(true);
//     };

//     const closeDeleteDialog = () => {
//         setSelectedEvent(null);
//         setIsDialogOpen(false);
//     };

//     const handleEdit = (id) => {
//         navigate(`/events/edit/${id}`);
//     };

//     if (!event) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <Spinner size="xl" />
//             </Box>
//         );
//     }
    
//     return (
//         <Box p={4}>
//             <Heading size="lg" mb={4}>Events</Heading>
//             {loading ? (
//                 <Spinner size="xl" />
//             ) : error ? (
//                 <Text color="red.500">{error}</Text>
//             ) : (
//                 <VStack spacing={4} align="stretch">
//                     {events.map(event => (
//                         <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
//                             <Heading size="md">{event.name}</Heading>
//                             <Text>{event.description}</Text>
//                             <Link to={`/events/${event._id}`}>
//                                 <Button mt={2} colorScheme="teal">View Details</Button>
//                             </Link>
//                             <Button mt={2} ml={2} colorScheme="yellow" onClick={() => handleEdit(event._id)}>Edit</Button>
//                             <Button mt={2} ml={2} colorScheme="red" onClick={() => openDeleteDialog(event)}>Delete</Button>
//                         </Box>
//                     ))}
//                 </VStack>
//             )}

//             <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={null} onClose={closeDeleteDialog}>
//                 <AlertDialogOverlay>
//                     <AlertDialogContent>
//                         <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                             Delete Event
//                         </AlertDialogHeader>
//                         <AlertDialogBody>
//                             Are you sure you want to delete this event? This action cannot be undone.
//                         </AlertDialogBody>
//                         <AlertDialogFooter>
//                             <Button onClick={closeDeleteDialog} disabled={deleting}>
//                                 Cancel
//                             </Button>
//                             <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={deleting}>
//                                 Delete
//                             </Button>
//                         </AlertDialogFooter>
//                     </AlertDialogContent>
//                 </AlertDialogOverlay>
//             </AlertDialog>
//         </Box>
//     );
// };

// export default EventList;
// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Button, Spinner, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
// import { fetchEvents, deleteEvent } from '../services/api';
// import { Link, useNavigate } from 'react-router-dom';

// const EventList = ({ events, onEdit }) => {
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const toast = useToast();
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     const handleDelete = async () => {
//         setDeleting(true);
//         try {
//             await deleteEvent(selectedEvent._id, token);
//             toast({
//                 title: "Event deleted.",
//                 description: "The event has been successfully deleted.",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             setIsDialogOpen(false);
//             setSelectedEvent(null);
//         } catch (error) {
//             setError('Failed to delete event. Please try again later.');
//             toast({
//                 title: "Error",
//                 description: "Failed to delete event. Please try again later.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } finally {
//             setDeleting(false);
//         }
//     };

//     const openDeleteDialog = (event) => {
//         setSelectedEvent(event);
//         setIsDialogOpen(true);
//     };

//     const closeDeleteDialog = () => {
//         setSelectedEvent(null);
//         setIsDialogOpen(false);
//     };

//     const handleEdit = (event) => {
//         onEdit(event);
//     };

//     if (!events.length) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <Spinner size="xl" />
//             </Box>
//         );
//     }

//     return (
//         <Box p={4}>
//             <Heading size="lg" mb={4}>Events</Heading>
//             {loading ? (
//                 <Spinner size="xl" />
//             ) : error ? (
//                 <Text color="red.500">{error}</Text>
//             ) : (
//                 <VStack spacing={4} align="stretch">
//                     {events.map(event => (
//                         <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
//                             <Heading size="md">{event.name}</Heading>
//                             <Text>{event.description}</Text>
//                             <Link to={`/events/${event._id}`}>
//                                 <Button mt={2} colorScheme="teal">View Details</Button>
//                             </Link>
//                             <Button mt={2} ml={2} colorScheme="yellow" onClick={() => handleEdit(event)}>Edit</Button>
//                             <Button mt={2} ml={2} colorScheme="red" onClick={() => openDeleteDialog(event)}>Delete</Button>
//                         </Box>
//                     ))}
//                 </VStack>
//             )}

//             <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={null} onClose={closeDeleteDialog}>
//                 <AlertDialogOverlay>
//                     <AlertDialogContent>
//                         <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                             Delete Event
//                         </AlertDialogHeader>
//                         <AlertDialogBody>
//                             Are you sure you want to delete this event? This action cannot be undone.
//                         </AlertDialogBody>
//                         <AlertDialogFooter>
//                             <Button onClick={closeDeleteDialog} disabled={deleting}>
//                                 Cancel
//                             </Button>
//                             <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={deleting}>
//                                 Delete
//                             </Button>
//                         </AlertDialogFooter>
//                     </AlertDialogContent>
//                 </AlertDialogOverlay>
//             </AlertDialog>
//         </Box>
//     );
// };

// export default EventList;
import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Button, Spinner, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { deleteEvent } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const EventList = ({ events, onEdit, onDelete }) => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const toast = useToast();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteEvent(selectedEvent._id, token);
            onDelete(selectedEvent._id);
            toast({
                title: "Event deleted.",
                description: "The event has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsDialogOpen(false);
            setSelectedEvent(null);
        } catch (error) {
            setError('Failed to delete event. Please try again later.');
            toast({
                title: "Error",
                description: "Failed to delete event. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setDeleting(false);
        }
    };

    const openDeleteDialog = (event) => {
        setSelectedEvent(event);
        setIsDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setSelectedEvent(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (event) => {
        onEdit(event);
    };

    if (!events.length) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Heading size="lg" mb={4}>Events</Heading>
            {error && <Text color="red.500">{error}</Text>}
            <VStack spacing={4} align="stretch">
                {events.map(event => (
                    <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
                        <Heading size="md">{event.name}</Heading>
                        <Text>{event.description}</Text>
                        <Link to={`/events/${event._id}`}>
                            <Button mt={2} colorScheme="teal">View Details</Button>
                        </Link>
                        <Button mt={2} ml={2} colorScheme="yellow" onClick={() => handleEdit(event)}>Edit</Button>
                        <Button mt={2} ml={2} colorScheme="red" onClick={() => openDeleteDialog(event)}>Delete</Button>
                    </Box>
                ))}
            </VStack>

            <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={null} onClose={closeDeleteDialog}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Event
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={closeDeleteDialog} disabled={deleting}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={deleting}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default EventList;
