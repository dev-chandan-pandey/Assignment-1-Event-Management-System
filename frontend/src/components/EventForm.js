// import React, { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading } from '@chakra-ui/react';
// import { createEvent } from '../services/api';

// const EventForm = ({ token, onSave }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);

//     const handleSessionChange = (index, field, value) => {
//         const newSessions = [...sessions];
//         newSessions[index][field] = value;
//         setSessions(newSessions);
//     };

//     const addSession = () => {
//         setSessions([...sessions, { title: '', startTime: '', endTime: '' }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createEvent({ name, description, sessions }, token);
//             onSave();
//         } catch (error) {
//             console.error('Error creating event:', error);
//             alert('Failed to create event. Please try again.');
//         }
//     };

//     return (
//         <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
//             <VStack spacing={4} align="stretch">
//                 <Heading size="md">Create Event</Heading>
//                 <FormControl>
//                     <FormLabel>Event Name</FormLabel>
//                     <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Description</FormLabel>
//                     <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </FormControl>
//                 <VStack spacing={2} align="stretch">
//                     <Heading size="sm">Sessions</Heading>
//                     {sessions.map((session, index) => (
//                         <Box key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
//                             <FormControl>
//                                 <FormLabel>Session Title</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="Session Title"
//                                     value={session.title}
//                                     onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Start Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.startTime}
//                                     onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>End Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.endTime}
//                                     onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                         </Box>
//                     ))}
//                     <Button onClick={addSession} colorScheme="teal" variant="outline">
//                         Add Session
//                     </Button>
//                 </VStack>
//                 <Button type="submit" colorScheme="teal" width="full">
//                     Create Event
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

// export default EventForm;

// import React, { useState, useEffect } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, FormErrorMessage, useToast } from '@chakra-ui/react';
// import { createEvent, fetchEventById, updateEvent } from '../services/api';
// import { useNavigate, useParams } from 'react-router-dom';

// const EventForm = ({ token, onSave }) => {
//     const { id } = useParams();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);
//     const navigate = useNavigate();
//     const toast = useToast();
//     useEffect(() => {
//         if (id) {
//             const loadEvent = async () => {
//                 try {
//                     const response = await fetchEventById(id, token);
//                     const { name, description, sessions } = response.data;
//                     setName(name);
//                     setDescription(description);
//                     setSessions(sessions);
//                 } catch (error) {
//                     console.error('Error loading event:', error);
//                 }
//             };
//             loadEvent();
//         }
//     }, [id, token]);

//     const handleSessionChange = (index, field, value) => {
//         const newSessions = [...sessions];
//         newSessions[index][field] = value;
//         setSessions(newSessions);
//     };

//     const addSession = () => {
//         setSessions([...sessions, { title: '', startTime: '', endTime: '' }]);
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         if (id) {
//     //             await updateEvent(id, { name, description, sessions }, token);
//     //         } else {
//     //             await createEvent({ name, description, sessions }, token);
//     //         }
//     //         onSave();
//     //         navigate('/');  // Redirect to home page after saving
//     //     } catch (error) {
//     //         console.error('Error saving event:', error);
//     //         alert('Failed to save event. Please try again.');
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (id) {
//                 await updateEvent(id, { name, description, sessions }, token);
//                 toast({
//                     title: "Event updated.",
//                     description: "The event has been successfully updated.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             } else {
//                 await createEvent({ name, description, sessions }, token);
//                 toast({
//                     title: "Event created.",
//                     description: "The event has been successfully created.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//             onSave();
//             navigate('/');
//         } catch (error) {
//             console.error('Error saving event:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to save event. Please try again.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };
    
//     return (
//         <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
//             <VStack spacing={4} align="stretch">
//                 <Heading size="md">{id ? 'Edit Event' : 'Create Event'}</Heading>
//                 {/* <FormControl>
//                     <FormLabel>Event Name</FormLabel>
//                     <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                 </FormControl> */}
//                 <FormControl isInvalid={!name}>
//   <FormLabel>Event Name</FormLabel>
//   <Input
//     type="text"
//     value={name}
//     onChange={(e) => setName(e.target.value)}
//     required
//   />
//   {!name && <FormErrorMessage>Event name is required.</FormErrorMessage>}
// </FormControl>
//                 <FormControl>
//                     <FormLabel>Description</FormLabel>
//                     <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </FormControl>
//                 <VStack spacing={2} align="stretch">
//                     <Heading size="sm">Sessions</Heading>
//                     {sessions.map((session, index) => (
//                         <Box key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
//                             <FormControl>
//                                 <FormLabel>Session Title</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="Session Title"
//                                     value={session.title}
//                                     onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Start Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.startTime}
//                                     onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>End Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.endTime}
//                                     onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                         </Box>
//                     ))}
//                     <Button onClick={addSession} colorScheme="teal" variant="outline">
//                         Add Session
//                     </Button>
//                 </VStack>
//                 <Button type="submit" colorScheme="teal" width="full">
//                     {id ? 'Update Event' : 'Create Event'}
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

// export default EventForm;
// import React, { useState, useEffect } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, FormErrorMessage, useToast } from '@chakra-ui/react';
// import { createEvent, fetchEventById, updateEvent } from '../services/api';
// import { useNavigate, useParams } from 'react-router-dom';

// const EventForm = ({ token, onSave, eventToEdit }) => {
//     const { id } = useParams();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);
//     const navigate = useNavigate();
//     const toast = useToast();

//     useEffect(() => {
//         if (eventToEdit) {
//             const { name, description, sessions } = eventToEdit;
//             setName(name);
//             setDescription(description);
//             setSessions(sessions);
//         }
//     }, [eventToEdit]);

//     const handleSessionChange = (index, field, value) => {
//         const newSessions = [...sessions];
//         newSessions[index][field] = value;
//         setSessions(newSessions);
//     };

//     const addSession = () => {
//         setSessions([...sessions, { title: '', startTime: '', endTime: '' }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (eventToEdit) {
//                 await updateEvent(eventToEdit._id, { name, description, sessions }, token);
//                 toast({
//                     title: "Event updated.",
//                     description: "The event has been successfully updated.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             } else {
//                 await createEvent({ name, description, sessions }, token);
//                 toast({
//                     title: "Event created.",
//                     description: "The event has been successfully created.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//             onSave();
//             navigate('/');
//         } catch (error) {
//             console.error('Error saving event:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to save event. Please try again.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
//             <VStack spacing={4} align="stretch">
//                 <Heading size="md">{eventToEdit ? 'Edit Event' : 'Create Event'}</Heading>
//                 <FormControl isInvalid={!name}>
//                     <FormLabel>Event Name</FormLabel>
//                     <Input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     {!name && <FormErrorMessage>Event name is required.</FormErrorMessage>}
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Description</FormLabel>
//                     <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </FormControl>
//                 <VStack spacing={2} align="stretch">
//                     <Heading size="sm">Sessions</Heading>
//                     {sessions.map((session, index) => (
//                         <Box key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
//                             <FormControl>
//                                 <FormLabel>Session Title</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="Session Title"
//                                     value={session.title}
//                                     onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>Start Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.startTime}
//                                     onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                             <FormControl>
//                                 <FormLabel>End Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.endTime}
//                                     onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
//                                     required
//                                 />
//                             </FormControl>
//                         </Box>
//                     ))}
//                     <Button onClick={addSession} colorScheme="teal" variant="outline">
//                         Add Session
//                     </Button>
//                 </VStack>
//                 <Button type="submit" colorScheme="teal" width="full">
//                     {eventToEdit ? 'Update Event' : 'Create Event'}
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

// export default EventForm;
// import React, { useState, useEffect } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, FormErrorMessage, useToast, Spinner } from '@chakra-ui/react';
// import { createEvent, updateEvent } from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const EventForm = ({ token, onSave, eventToEdit }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);
//     const [isSubmitting, setIsSubmitting] = useState(false); // Added submitting state
//     const navigate = useNavigate();
//     const toast = useToast();

//     useEffect(() => {
//         if (eventToEdit) {
//             const { name, description, sessions } = eventToEdit;
//             setName(name);
//             setDescription(description);
//             setSessions(sessions);
//         }
//     }, [eventToEdit]);

//     const handleSessionChange = (index, field, value) => {
//         const newSessions = [...sessions];
//         newSessions[index][field] = value;
//         setSessions(newSessions);
//     };

//     const addSession = () => {
//         setSessions([...sessions, { title: '', startTime: '', endTime: '' }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true); // Set submitting to true
//         try {
//             if (eventToEdit) {
//                 await updateEvent(eventToEdit._id, { name, description, sessions }, token);
//                 toast({
//                     title: "Event Updated",
//                     description: "The event has been successfully updated.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             } else {
//                 await createEvent({ name, description, sessions }, token);
//                 toast({
//                     title: "Event Created",
//                     description: "The event has been successfully created.",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                 });
//             }
//             onSave();
//             navigate('/');
//         } catch (error) {
//             console.error('Error saving event:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to save the event. Please try again.",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } finally {
//             setIsSubmitting(false); // Reset submitting state
//         }
//     };

//     return (
//         <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
//             <VStack spacing={4} align="stretch">
//                 <Heading size="md">{eventToEdit ? 'Edit Event' : 'Create Event'}</Heading>
//                 <FormControl isInvalid={!name && isSubmitting}>
//                     <FormLabel>Event Name</FormLabel>
//                     <Input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         isDisabled={isSubmitting} // Disable input while submitting
//                     />
//                     {!name && isSubmitting && (
//                         <FormErrorMessage>Event name is required.</FormErrorMessage>
//                     )}
//                 </FormControl>
//                 <FormControl isInvalid={!description && isSubmitting}>
//                     <FormLabel>Description</FormLabel>
//                     <Textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                         isDisabled={isSubmitting} // Disable input while submitting
//                     />
//                     {!description && isSubmitting && (
//                         <FormErrorMessage>Description is required.</FormErrorMessage>
//                     )}
//                 </FormControl>
//                 <VStack spacing={2} align="stretch">
//                     <Heading size="sm">Sessions</Heading>
//                     {sessions.map((session, index) => (
//                         <Box key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
//                             <FormControl isInvalid={!session.title && isSubmitting}>
//                                 <FormLabel>Session Title</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="Session Title"
//                                     value={session.title}
//                                     onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
//                                     required
//                                     isDisabled={isSubmitting} // Disable input while submitting
//                                 />
//                                 {!session.title && isSubmitting && (
//                                     <FormErrorMessage>Session title is required.</FormErrorMessage>
//                                 )}
//                             </FormControl>
//                             <FormControl isInvalid={!session.startTime && isSubmitting}>
//                                 <FormLabel>Start Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.startTime}
//                                     onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
//                                     required
//                                     isDisabled={isSubmitting} // Disable input while submitting
//                                 />
//                                 {!session.startTime && isSubmitting && (
//                                     <FormErrorMessage>Start time is required.</FormErrorMessage>
//                                 )}
//                             </FormControl>
//                             <FormControl isInvalid={!session.endTime && isSubmitting}>
//                                 <FormLabel>End Time</FormLabel>
//                                 <Input
//                                     type="datetime-local"
//                                     value={session.endTime}
//                                     onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
//                                     required
//                                     isDisabled={isSubmitting} // Disable input while submitting
//                                 />
//                                 {!session.endTime && isSubmitting && (
//                                     <FormErrorMessage>End time is required.</FormErrorMessage>
//                                 )}
//                             </FormControl>
//                         </Box>
//                     ))}
//                     <Button onClick={addSession} colorScheme="teal" variant="outline" isDisabled={isSubmitting}>
//                         Add Session
//                     </Button>
//                 </VStack>
//                 <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
//                     {eventToEdit ? 'Update Event' : 'Create Event'}
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

// export default EventForm;
import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, FormErrorMessage, useToast, Spinner } from '@chakra-ui/react';
import { createEvent, fetchEventById, updateEvent } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EventForm = ({ token, onSave, eventToEdit }) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (eventToEdit) {
            const { name, description, sessions } = eventToEdit;
            setName(name);
            setDescription(description);
            setSessions(sessions);
        }
    }, [eventToEdit]);

    const handleSessionChange = (index, field, value) => {
        const newSessions = [...sessions];
        newSessions[index][field] = value;
        setSessions(newSessions);
    };

    const addSession = () => {
        setSessions([...sessions, { title: '', startTime: '', endTime: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (eventToEdit) {
                await updateEvent(eventToEdit._id, { name, description, sessions }, token);
                toast({
                    title: "Event updated.",
                    description: "The event has been successfully updated.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createEvent({ name, description, sessions }, token);
                toast({
                    title: "Event created.",
                    description: "The event has been successfully created.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            onSave();
            navigate('/');
        } catch (error) {
            console.error('Error saving event:', error);
            toast({
                title: "Error",
                description: "Failed to save event. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
            <VStack spacing={4} align="stretch">
                <Heading size="md">{eventToEdit ? 'Edit Event' : 'Create Event'}</Heading>
                <FormControl isInvalid={!name}>
                    <FormLabel>Event Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {!name && <FormErrorMessage>Event name is required.</FormErrorMessage>}
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </FormControl>
                <VStack spacing={2} align="stretch">
                    <Heading size="sm">Sessions</Heading>
                    {sessions.map((session, index) => (
                        <Box key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
                            <FormControl>
                                <FormLabel>Session Title</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Session Title"
                                    value={session.title}
                                    onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Start Time</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={session.startTime}
                                    onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>End Time</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={session.endTime}
                                    onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Box>
                    ))}
                    <Button onClick={addSession} colorScheme="teal" variant="outline">
                        Add Session
                    </Button>
                </VStack>
                <Button type="submit" colorScheme="teal" width="full" isLoading={loading}>
                    {eventToEdit ? 'Update Event' : 'Create Event'}
                </Button>
            </VStack>
        </Box>
    );
};

export default EventForm;
