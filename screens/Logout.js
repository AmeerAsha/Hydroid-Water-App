import { Alert} from 'react-native';
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