import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const HomePage = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    return (
        <Box p={4}>
            <VStack spacing={8} align="stretch">
                <EventForm token={token} onSave={handleSave} />
                <EventList />
            </VStack>
        </Box>
    );
};

export default HomePage;