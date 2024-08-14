import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, View ,TouchableOpacity, Alert} from 'react-native'
import { AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import config from '../../../Configurations/APIConfig'

const TicketDetails = () => {
  const [ticketDetails, setTicketDetails] = useState("");
  const [ticketResponse, setTicketResponse] = useState([]);
  const [errors, setErrors] = useState({});

  const [comment, setComment] = useState("")
  const route = useRoute()
  const id = route.params?.id
  const {userInfo} = useContext(AuthContext);
  const UserId = userInfo.userId

  const validateForm = () => {
    let errors = {};

    if (!comment) errors.comment = "Comment field is required";
    

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const GetTicketDetailsbyId = () => {
    axios.get(config.APIACTIVATEURL + config.GETTICKETBYID + "/"+`${id}`).then
       ((res)=>
       {
        const response = (res.data);
        setTicketDetails(response);
        console.log(response)
      }
       ).catch((err)=>{ console.log(err)});
  };
  const GetTicketResponsebyId = () => {
    axios.get(config.APIACTIVATEURL + config.GETTICKETRESPONSEBYID + "?TicketId="+`${id}`).then
       ((res)=>
       {
        const response = (res.data.data.data);
        setTicketResponse(response);
        console.log(response)
      }
       ).catch((err)=>{ console.log(err)});
  };
  
  useEffect(()=>{
    GetTicketDetailsbyId();
    GetTicketResponsebyId();
  },
  
  []);
  const handleCommentChange=(text)=>{
    setComment(text)
  }
const PostComment =()=>{
  if(validateForm()){
  axios.post(config.APIACTIVATEURL + config.CREATETICKETRESPONSE,{
    ticketResponseId: "00000000-0000-0000-0000-000000000000",
  ticketId: id,
  ticketResponseData: comment,
  userId: UserId,
  }).then
       ((res)=>
       {
        const response= (res.data);
        console.log(response);
        if(response.statusCode === 200){
          GetTicketResponsebyId();
          Alert.alert("Ticket Created")

        }else{
          console.log("err")
        }
      }
       ).catch((err)=>{ console.log(err)});
}
}
  return (
    <ScrollView>
    <View style={styles.page}>
        <View style={styles.topContent}>
            <Text style={styles.heading}>TICKET DESCRIPTION</Text>
            <Text style={styles.query}>{ticketDetails.ticketQuery}</Text>
            </View>
            <View style={{margin:10,height:"auto"}}>
                <Text style={styles.comments}>Comments</Text>
                <View style={{margin:10}}><Text>
        {ticketResponse.map(xyz=> <View style={{margin:10,marginBottom:30}}key={xyz.ticketResponseId}>
          <View style={{flex:1,flexDirection:"row"}}>
        <Text style={styles.name}>{xyz.name}</Text>
        <Text style={{marginLeft:10}}>{moment(xyz.updatedDate).format('MMM Do YYYY, h:mm a')}</Text>
        </View>
        <View style={{width:270}}><Text style={styles.responseData}>{xyz.ticketResponseData}</Text></View>
        
        
        </View>)}
          </Text></View>
                
            </View>
            <View style={{margin:10}}>
                <Text style={styles.heading2}>
                Leave a Comments
                </Text>
                <TextInput
              style={styles.commentline}
              value={comment}
              placeholder="Enter Comments"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text)=>handleCommentChange(text)}
            />
            {errors.comment ? (
          <Text style={styles.commentError}>{errors.comment}</Text>
        ) : null}
            </View>
            <View style={styles.buttonView}>
            <TouchableOpacity>
      <Text 
      style = {styles.buttonText} onPress={PostComment}
   >Post Comments</Text>
   </TouchableOpacity>
            </View>
            </View>
            <View style={styles.bottomContent}>
      <Text style={styles.heading3}>Ticket Details</Text>
      <View style={styles.box}key= {ticketDetails.ticketNo}>
        <Text style={styles.boxText}>Ticket                <Text style={styles.boxResponse}>{ticketDetails.ticketNo}</Text></Text>
        <Text style={styles.boxText}>Raised By          <Text style={styles.boxResponse}>{ticketDetails.name}</Text></Text>
        <Text style={styles.boxText}>Status                <Text style={styles.boxResponse}>{ticketDetails.ticketStatus}</Text></Text>
        <Text style={styles.boxText}>Priority               <Text style={styles.boxResponse}>{ticketDetails.ticketPriority}</Text></Text>
        <Text style={styles.boxText}>Create Date      <Text style={styles.boxResponse}>{moment(ticketDetails.createdDate).format('MMM Do YYYY, h:mm a')}</Text></Text>
        <Text style={styles.boxText}>Last Activity    <Text style={styles.boxResponse}>{moment(ticketDetails.updatedDate).format('MMM Do YYYY, h:mm a')}</Text></Text>
      </View>
        
          
    </View>
            
            </ScrollView>
  )
}

export default TicketDetails
