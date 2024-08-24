// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Input, FormLabel, VStack, Heading, Text } from '@chakra-ui/react';
// import { registerUser } from '../services/api';

// const RegisterPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//         try {
//             const response = await registerUser({ name, email, password });
//             localStorage.setItem('token', response.data.token);
//             navigate('/');  // Redirect to home page after successful registration
//         } catch (err) {
//             setError('Registration failed. Please try again.');
//         }
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={4} align="stretch" maxW="md" mx="auto">
//                 <Heading>Register</Heading>
//                 {error && <Text color="red.500">{error}</Text>}
//                 <Box as="form" onSubmit={handleSubmit}>
//                     <FormLabel>Name</FormLabel>
//                     <Input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <FormLabel>Confirm Password</FormLabel>
//                     <Input
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" colorScheme="teal" mt={4}>
//                         Register
//                     </Button>
//                 </Box>
//                 <Text>
//                     Already have an account? <a href="/login" style={{ color: 'teal' }}>Login</a>
//                 </Text>
//             </VStack>
//         </Box>
//     );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormLabel, VStack, Heading, Text, Spinner } from '@chakra-ui/react';
import { registerUser } from '../services/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true); // Start loading
        try {
            const response = await registerUser({ name, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/login');  // Redirect to login page after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch" maxW="md" mx="auto">
                <Heading>Register</Heading>
                {error && <Text color="red.500">{error}</Text>}
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
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" colorScheme="teal" mt={4} isDisabled={loading}>
                        {loading ? <Spinner size="sm" /> : 'Register'}
                    </Button>
                </Box>
                <Text>
                    Already have an account? <a href="/login" style={{ color: 'teal' }}>Login</a>
                </Text>
            </VStack>
        </Box>
    );
};

export default RegisterPage;
