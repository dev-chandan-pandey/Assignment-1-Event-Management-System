import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading } from '@chakra-ui/react';
import { createEvent } from '../services/api';

const EventForm = ({ token, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sessions, setSessions] = useState([{ title: '', startTime: '', endTime: '' }]);

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
        try {
            await createEvent({ name, description, sessions }, token);
            onSave();
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
            <VStack spacing={4} align="stretch">
                <Heading size="md">Create Event</Heading>
                <FormControl>
                    <FormLabel>Event Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
                <Button type="submit" colorScheme="teal" width="full">
                    Create Event
                </Button>
            </VStack>
        </Box>
    );
};

export default EventForm;