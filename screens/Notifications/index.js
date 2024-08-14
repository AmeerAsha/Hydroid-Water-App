import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../context/AuthContext';
import 'react-native-url-polyfill/auto'
import styles from './styles';
import config from '../../Configurations/APIConfig';

const Notifications = ({navigation}) => {
  const [notification, setNotification] = useState([]);
  const [ticket, setTicket] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const UserId = userInfo.userId

  const GetNotificationById = () => {
    axios.get(config.APIACTIVATEURL + config.GETNOTIFICATIONBYUSER + "?ToUserId=" +`${UserId}`).then
       ((res)=>
       {
        setNotification(res.data.data.data);
        console.log(res.data.data.data)
      }
       );
  };
   
  const GetTicketDetails = () => {
    axios.get(config.APIACTIVATEURL + config.GETALLTICKETS).then
       ((res)=>
       {
        setTicket(res.data.data.data);
        console.log(res.data.data.data)
      }
       );
  };
  useEffect(()=>{
    GetNotificationById();
    GetTicketDetails();
  },
  
  []);

  const DeleteNotificationOnCondition = (id) =>
    Alert.alert('hydroid.trawtel.com says', 'Are you sure to delete this record?', [
      {
        text: 'Cancel',
        
        
      },
      {text: 'OK', onPress:()=> DeleteNotification(id)},
    ],
    {
      cancelable: true,
    }
    );

    const DeleteNotification=(id)=>{
      axios.delete(config.APIACTIVATEURL + config.DELETENOTIFICATION +"/" +`${id}`).then
      ((res)=>
        {
         console.log(res.data);
         if(res.data.statusCode === 200){
           Alert.alert("Notification Deleted Successfully")
         }else{
           console.log("err")
         }
         GetNotificationById();

       }
        ).catch(err=>console.log(err));
   }  
   
  return (
    <ScrollView>
    <View style={styles.page}>
      <Text style={styles.heading}>Notifications List</Text>
        {notification.map(xyz=> <View key={xyz.notificationId}>
          <View style={{margin:10}}>
        <View style={styles.boxView} >
        <Text style={styles.boxText}>Notification : <Text style={styles.boxres}>{xyz.notificationText}</Text></Text>
        <Text style={styles.boxText}>Notification Type : <Text style={styles.boxres}>{xyz.type}</Text></Text>
        <Text style={styles.boxText}>Date : <Text style={styles.boxres}>{moment(xyz.updatedDate).format('MMM Do YYYY, h:mm a')} </Text></Text>
        <Text style={styles.boxText}>Status : <Text style={styles.boxres}>Active</Text></Text>
        <Text style={styles.boxText}>Action :
        <View style={{flex:1,flexDirection:"row"}}> 
        <Text style={{marginLeft:20}}>
        <Icon name="eye" size={25} color="#088675" style={{margin:10}} onPress={() => navigation.navigate("TicketDetails",{id:(xyz.url .split( '/' ))[ (xyz.url .split( '/' )).length - 1 ]})}></Icon>
        </Text>
        <Text style={{marginLeft:30}}>
        <Icon2 name="delete" size={25} color="#A52A2A" style={{margin:10}} onPress={()=> DeleteNotificationOnCondition(xyz.notificationId)} ></Icon2>
        </Text>
        </View>
         </Text>
        </View>
        </View>
        </View>
        )}     
    </View>
    </ScrollView>
  )
}

export default Notifications