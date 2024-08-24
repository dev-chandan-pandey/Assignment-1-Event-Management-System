import React, { useState } from 'react';
import { Box, Button, Input, FormLabel, VStack, Heading, Text } from '@chakra-ui/react';
import { registerParticipant } from '../services/api';

const ParticipantRegistration = ({ eventId, sessionId, token }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerParticipant(eventId, sessionId, { name, email }, token);
            setSuccess('Participant registered successfully!');
            setName('');
            setEmail('');
        } catch (error) {
            setError('Failed to register participant.');
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch" maxW="md" mx="auto">
                <Heading>Register Participant</Heading>
                {error && <Text color="red.500">{error}</Text>}
                {success && <Text color="green.500">{success}</Text>}
                <Box as="form" onSubmit={handleSubmit}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" colorScheme="teal" mt={4}>Register</Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default ParticipantRegistration;
