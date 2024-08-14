import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';
import { setupURLPolyfill } from "react-native-url-polyfill"


const App = () => {
  return (
    
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
   </AuthProvider>
  );
};

export default App;
