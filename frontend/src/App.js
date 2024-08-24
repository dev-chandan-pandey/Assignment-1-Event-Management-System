// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import EventDetails from './components/EventDetails'; // Import EventDetails
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//     return (
//         <ChakraProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//                     <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </Router>
//         </ChakraProvider>
//     );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import EventDetails from './components/EventDetails';
// import ParticipantRegistration from './components/ParticipantRegistration';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//                 <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
//                 <Route path="/events/:eventId/sessions/:sessionId/register" element={<ProtectedRoute><ParticipantRegistration /></ProtectedRoute>} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetails from './components/EventDetails';
import ParticipantRegistration from './components/ParticipantRegistration';
import EventForm from './components/EventForm'; // Add this import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
                <Route path="/events/edit/:id" element={<ProtectedRoute><EventForm token={localStorage.getItem('token')} onSave={() => {}} /></ProtectedRoute>} /> {/* New Route */}
                <Route path="/events/:eventId/sessions/:sessionId/register" element={<ProtectedRoute><ParticipantRegistration /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
