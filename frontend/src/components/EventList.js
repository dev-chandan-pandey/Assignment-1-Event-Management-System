import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { fetchEvents } from '../services/api';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const response = await fetchEvents();
            setEvents(response.data);
        };
        loadEvents();
    }, []);

    return (
        <Box p={4}>
            <Heading size="lg" mb={4}>Events</Heading>
            <VStack spacing={4} align="stretch">
                {events.map(event => (
                    <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
                        <Heading size="md">{event.name}</Heading>
                        <Text>{event.description}</Text>
                        <Link to={`/events/${event._id}`}>
                            <Button mt={2} colorScheme="teal">View Details</Button>
                        </Link>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default EventList;