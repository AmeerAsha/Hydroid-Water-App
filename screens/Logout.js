import { Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


const Logout = () => {
  const {logout} = useContext(AuthContext);
  
  
  useEffect(()=>{
    logout();   
  },
[]);
  return Alert.alert("Successfully logged out");
};
export default Logout;