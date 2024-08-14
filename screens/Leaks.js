import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

const Leaks = () => {
  const [leaks, setLeaks] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const UserId=userInfo.userId


  const GetleaksDetails = () => {
    axios.post(`https://hydroidwater.azurewebsites.net/api/WaterUsage/GetLeakInformation?UserId=${UserId}`).then
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
    <View style={{height:"auto",backgroundColor:"#e9ebec"}}>
      <Text style={{fontSize:23,marginTop:10,marginLeft:5,fontWeight:"bold",color:"gray"}}>Leaks Information Data</Text>
      
        {leaks.map((xyz,index)=>
        <View key={index}>
          <View style={{margin:10}}>
         <View style={{borderWidth:5,backgroundColor:"#daf4f0",borderColor:"white",borderRadius:20,margin:10,width:320}} >
        <Text style={{fontSize:17,margin:10,color:"#088675",fontWeight:"bold"}}>Id : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{index+1}</Text></Text>
        <Text style={{fontSize:17,margin:10,color:"#088675",fontWeight:"bold"}}>Date and Time : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{moment(xyz.created_Date).format('MMM Do YYYY, h:mm a')} </Text></Text>
        <Text style={{fontSize:17,margin:10,color:"#088675",fontWeight:"bold"}}>Device ID : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.deviceId}</Text></Text>
        <Text style={{fontSize:17,margin:10,color:"#088675",fontWeight:"bold"}}>Application ID : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.applicationId}</Text></Text>
        <Text style={{fontSize:17,margin:10,color:"#088675",fontWeight:"bold"}}>Reading : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.payLoad_ASCII}</Text></Text>
        
        </View>
        </View>
        </View>
        )}
          
          
    </View>
    </ScrollView>
  )
}

export default Leaks;
