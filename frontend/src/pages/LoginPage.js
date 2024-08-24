// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Input, FormLabel, VStack, Heading, Text } from '@chakra-ui/react';
// import { loginUser } from '../services/api';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await loginUser({ email, password });
//             localStorage.setItem('token', response.data.token);
//             navigate('/');  // Redirect to home page after successful login
//         } catch (err) {
//             setError('Login failed. Please check your credentials and try again.');
//         }
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={4} align="stretch" maxW="md" mx="auto">
//                 <Heading>Login</Heading>
//                 {error && <Text color="red.500">{error}</Text>}
//                 <Box as="form" onSubmit={handleSubmit}>
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
//                     <Button type="submit" colorScheme="teal" mt={4}>
//                         Login
//                     </Button>
//                 </Box>
//                 <Text>
//                     Don't have an account? <a href="/register" style={{ color: 'teal' }}>Register</a>
//                 </Text>
//             </VStack>
//         </Box>
//     );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormLabel, VStack, Heading, Text, Spinner } from '@chakra-ui/react';
import { loginUser } from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');  // Redirect to home page after successful login
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch" maxW="md" mx="auto">
                <Heading>Login</Heading>
                {error && <Text color="red.500">{error}</Text>}
                <Box as="form" onSubmit={handleSubmit}>
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
                    <Button type="submit" colorScheme="teal" mt={4} isDisabled={loading}>
                        {loading ? <Spinner size="sm" /> : 'Login'}
                    </Button>
                </Box>
                <Text>
                    Don't have an account? <a href="/register" style={{ color: 'teal' }}>Register</a>
                </Text>
            </VStack>
        </Box>
    );
};

export default LoginPage;
