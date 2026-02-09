import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from './App';
import './index.css';

// Register the app with React Native Web's AppRegistry
AppRegistry.registerComponent('App', () => App);

// Mount the app using standard React DOM
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
