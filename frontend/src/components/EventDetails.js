import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { fetchEventReport, fetchEventById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
    const { id } = useParams(); // Get event ID from URL params
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const response = await fetchEventById(id, token);
                setEvent(response.data);
            } catch (error) {
                console.error('Error loading event:', error);
                setError('Failed to load event details. Please try again later.');
                if (error.response && error.response.status === 401) {
                    navigate('/login');  // Redirect to login if unauthorized
                }
            }
        };
        loadEvent();
    }, [id, token, navigate]);

    const downloadReport = async () => {
        try {
            const response = await fetchEventReport(id, token);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${event.name}_report.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading report:', error);
            setError('Failed to download the report. Please try again later.');
        }
    };
  
    
    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    if (!event) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box p={4} borderRadius="md" boxShadow="md">
            <Heading size="md">{event.name}</Heading>
            <Text>{event.description}</Text>
            <VStack spacing={4} align="stretch" mt={4}>
                <Heading size="sm">Sessions</Heading>
                {event.sessions.map((session) => (
                    <Box key={session._id} p={3} border="1px solid #e2e8f0" borderRadius="md">
                        <Text fontWeight="bold">{session.title}</Text>
                        <Text>
                            {new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleString()}
                        </Text>
                    </Box>
                ))}
            </VStack>
            <Button mt={4} onClick={downloadReport} colorScheme="teal">
                Download Report
            </Button>
        </Box>
    );
};

export default EventDetails;