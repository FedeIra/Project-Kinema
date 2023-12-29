// Import react utilities:
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Import app component and store:
import App from './App';
import { store } from './Redux/store/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Import style:
import './index.css';

//Import fonts:
import '@fontsource/nunito';
import '@fontsource/raleway';

// Deploy:
import axios from 'axios';

// import dotenv from 'dotenv';
// dotenv.config();

axios.defaults.baseURL = 'http://localhost:3001' ||
  'https://kinema-project-deploy-production.up.railway.app/'


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
let persistor = persistStore(store)

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
  fonts: {
    heading: 'Raleway',
    body: 'Nunito',
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
