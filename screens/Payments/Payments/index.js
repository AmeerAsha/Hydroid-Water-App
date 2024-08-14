import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import { AuthContext } from '../../../context/AuthContext';
import config from '../../../Configurations/APIConfig';
import styles from './styles';

const Payments = ({navigation}) => {
  const [payment, setPayment] = useState([]);``
  const [paymentDetails, setPaymentDetails] = useState("");
  let razorpayKeyId = RAZORPAY_KEY_ID
  let razorpayKeySecret = RAZORPAY_KEY_SECRET
  const {userInfo} = useContext(AuthContext);

  const GetPaymentDetails = () => {
    axios.get(config.APIACTIVATEURL + config.GETALLPAYMENTREQUESTS).then
       ((res)=>
       {
        const response = (res.data);
        const response1 = response.data;
        const response2 = (response1.data);
        setPayment(response2);
        console.log(response2);
        
      }
       );
  };

     

 const SuccessPayment =(id)=>{
  
    axios.get(config.APIACTIVATEURL + config.GETNPAYMENTREQUESTBYID + "/"+`${id}`).then
       ((res)=>
       {
        const response = (res.data);
        setPaymentDetails(response)
        console.log(response);
        
      }
       );
  
  const { amount ,description, payedUser,paymentId, transactionNo} = paymentDetails;   
  axios.put(config.APIACTIVATEURL + config.UPDATEPAYMENTREQUEST,{
    paymentId: paymentId,
    transactionNo: transactionNo,
    payedUser: payedUser,
    amount:amount,
    status: "SUCCESS",
    description: description,
    
  })
  .then
       ((res)=>
       {
        const response = (res.data);
        if(response.statusCode===200){
          GetPaymentDetails();
        }
        
        
      }
       );
 }
  const handlePayment = (Amount,id) => {
          
   // const  userId=userInfo.userId
    const  Amountid=Amount
        
      var options = {
        description: 'Water Bill Recharge',
        currency: "INR",
        key: razorpayKeyId,
        amount: Amountid*100,
        name: 'ino-fi solutions pvt ltd.',
        order_id: "", 
        
        prefill: {
          email: "ashu.kkd.91@gmail.com",
          contact: "9999999999",
          name: userInfo.name,
        },
        theme: { color: "#61dafb" }
      }
  
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        console.log(data);
       Alert.alert(`Success: ${data.razorpay_payment_id}`);
       SuccessPayment(id);
       
       
        
        })
        .catch((error) => {
          // handle failure
          console.log(error)
         Alert.alert(`Error: ${error.code} | ${error.description}`);
        })
        
    };
  
  useEffect(()=>{
    GetPaymentDetails();
    
   
  },
  
  []);
  return (
    <ScrollView>
    <View style={styles.page}>
      <Text style={styles.heading}>Payments List</Text>
      
       
        {payment.map((xyz,index)=>
        <View key= {xyz.paymentId}>   
        <View style={{margin:10}}> 
        <View style={styles.bottomView}>
        <Text style={styles.boxText}>ID : <Text style={styles.boxResponse}>{index+1}</Text></Text>
        <Text style={styles.boxText}>Name : <Text style={styles.boxResponse}>{xyz.name}</Text></Text>
        <Text style={styles.boxText}>Amount : <Text style={styles.boxResponse}>{xyz.amount}</Text></Text>
        <Text style={styles.boxText}>Created Date : <Text style={styles.boxResponse}>{moment(xyz.createdDate).format('MMM Do YYYY, h:mm a')} </Text></Text>
        <Text style={styles.boxText}>Description : <Text style={styles.boxResponse}>{xyz.description}</Text></Text>
        <Text style={styles.boxText}>Status : <Text style={styles.boxResponse}>{xyz.status}</Text></Text>
        <Text style={styles.boxText}>Action :   
        <View>
          <Text style={{marginLeft:20}}>
          {
            xyz.status == 'PENDING' ?(
              <TouchableOpacity>
            <Text 
            style = {styles.paynowBtn} onPress={()=> handlePayment(xyz.amount,xyz.paymentId)} 
         >   PAYNOW   </Text>
         </TouchableOpacity>
            ):(
              <TouchableOpacity>
              <Text 
              style = {styles.viewBtn}  
           onPress={() => navigation.navigate('PaymentDetails',{ id: xyz.paymentId })}
           >   VIEW   </Text>
           </TouchableOpacity>
            )
          }          
          </Text>
        </View>
        </Text>
        </View>
        </View>
        </View>)}     
    </View>
    </ScrollView>
  )
}

export default Payments