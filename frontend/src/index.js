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

///give me code one by one of both side corresponding to each other with intregation
//develope remaining part that is not been developed until now . develop single single part corresponding to it's frountend because i think it's make easy to debuge ,with intregation to test