import React from 'react';
import ReactDOM from 'react-dom/client'; // Change from 'react-dom' to 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);

