import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ScrollView, View ,Text} from 'react-native'
import config from '../../../Configurations/APIConfig';
import styles from './styles';



const PaymentDetails = () => {
    const route = useRoute()
  const id = route.params?.id
   const[paymentDetails, setPaymentDetails] = useState("")
  const GetPaymentDetailsbyId = () => {
    axios.get(config.APIACTIVATEURL + config.GETNPAYMENTREQUESTBYID + "/" +`${id}`).then
       ((res)=>
       {
        const response = (res.data);
        setPaymentDetails(response);
        console.log(response)
      }
       ).catch((err)=>{ console.log(err)});
  };
   
  useEffect(()=>{
    GetPaymentDetailsbyId();
  },
  
  []);
  return (
    <ScrollView>
        <View style={styles.page}>
      <Text style={styles.heading}>Payment Details</Text>
      <View style={styles.boxView}>
        <Text style={styles.boxText}>Description                <Text style={styles.boxRes}>{paymentDetails.description}</Text></Text>
        <Text style={styles.boxText}>Amount                       <Text style={styles.boxRes}>{paymentDetails.amount}</Text></Text>
        <Text style={styles.boxText}>Reference No             <Text style={styles.boxRes}>{paymentDetails.referenceNo}</Text></Text>
        <Text style={styles.boxText}>Status                         <Text style={styles.boxRes}>{paymentDetails.status}</Text></Text>
        <Text style={styles.boxText}>Payment Date      <Text style={styles.boxRes}>{moment(paymentDetails.paymentDate).format('MMM Do YYYY, h:mm a')}</Text></Text>
        <Text style={styles.boxText}>Requested Date    <Text style={styles.boxRes}>{moment(paymentDetails.createdDate).format('MMM Do YYYY, h:mm a')}</Text></Text>
      </View>
        
    </View>
    </ScrollView>
  )
}

export default PaymentDetails
