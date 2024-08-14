import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import {AuthContext} from '../context/AuthContext';
import AppNavigator from '../screens/AppNavigator';
import TicketDetails from '../screens/Tickets/TicketDetails';
import PaymentDetails from '../screens/Payments/PaymentDetails';



const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading,isLoggedIn} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        {userInfo.roleName == "CUSTOMER"? (
          <Stack.Screen 
            name="HYDROID"
            component={AppNavigator} 
          />
        ) : (
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
                headerShown:false
              }}
            />      
        )}
           <Stack.Screen
              name="TicketDetails"
              component={TicketDetails} 
            />
            <Stack.Screen
              name="PaymentDetails"
              component={PaymentDetails}  
            />
        </Stack.Navigator>
        
    </NavigationContainer>
  );
};

export default Navigation;