import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DarkContextProvider } from './context/darkModeContext';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
  <DarkContextProvider>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>

  </DarkContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
