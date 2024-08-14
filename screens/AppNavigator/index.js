import { StatusBar } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import colors from '../../ui/colors';
import Dashboard from '../Dashboard';
import NewTicket from '../NewTicket';
import Notifications from '../Notifications';
import Leaks from '../Leaks';
import Logout from '../Logout';
import WaterUsage from '../WaterUsage';
import Payments from '../Payments/Payments';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Dashboard') {
                return <Icon name="dashboard" size={size} color={color} />;
              } else if (route.name === 'Meter Reading') {
                return <Icon name="gas-meter" size={size} color={color} />;
              } else if (route.name === 'New Ticket') {
                return <Icon2 name="ticket" size={size} color={color} />;
              }else if (route.name === 'Payments'){
                return <Icon4 name="sack-dollar" size={size} color={color} />;
              } else if (route.name === 'Notifications') {
                return <Icon name="notifications" size={size} color={color} />;
              } else if (route.name === 'Leaks') {
                return <Icon3 name="pipe-leak" size={size} color={color} />;  
              } else if (route.name === 'Logout') {
                return <Icon name="logout" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.tertiary2,
            tabBarStyle: [
              {
                display: 'flex',
              },
              null,
            ],
          })}
        >
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Meter Reading" component={WaterUsage} />
          <Tab.Screen name="New Ticket" component={NewTicket} />
          <Tab.Screen name='Payments'component={Payments}/>
          <Tab.Screen name="Notifications" component={Notifications} />
          <Tab.Screen name="Leaks" component={Leaks} />
          <Tab.Screen name="Logout" component={Logout} />
          
        </Tab.Navigator>
        
    </>
  );
};

export default AppNavigator;