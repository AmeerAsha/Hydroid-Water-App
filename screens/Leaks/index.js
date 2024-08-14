import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';
import config from '../../Configurations/APIConfig';

const Leaks = () => {
  const [leaks, setLeaks] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const UserId=userInfo.userId

  const GetleaksDetails = () => {
    axios.post(config.APIACTIVATEURL + config.GETLEAKDATA + "?UserId=" + `${UserId}`).then
       ((res)=>
       {
        const response = (res.data);
        const response1 = response.data;
        const response2 = (response1.data);
        setLeaks(response1);
        console.log(response1)
      }
       ).catch((err)=>{ console.log(err)});
  };
  
  useEffect(()=>{
    GetleaksDetails();
  },
  
  []);
  return (
    <ScrollView>
    <View style={styles.page}>
      <Text style={styles.heading}>Leaks Information Data</Text>
        {leaks.map((xyz,index)=>
        <View key={index}>
          <View style={{margin:10}}>
         <View style={styles.boxView} >
        <Text style={styles.boxText}>Id : <Text style={styles.boxRes}>{index+1}</Text></Text>
        <Text style={styles.boxText}>Date and Time : <Text style={styles.boxRes}>{moment(xyz.created_Date).format('MMM Do YYYY, h:mm a')} </Text></Text>
        <Text style={styles.boxText}>Device ID : <Text style={styles.boxRes}>{xyz.deviceId}</Text></Text>
        <Text style={styles.boxText}>Application ID : <Text style={styles.boxRes}>{xyz.applicationId}</Text></Text>
        <Text style={styles.boxText}>Reading : <Text style={styles.boxRes}>{xyz.payLoad_ASCII}</Text></Text>
        </View>
        </View>
        </View>
        )}      
    </View>
    </ScrollView>
  )
}

export default Leaks;
