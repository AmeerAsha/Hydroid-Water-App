import {View,Text,TextInput,ScrollView,TouchableOpacity,Alert} from 'react-native';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles';
import config from '../../../Configurations/APIConfig';

const initialFieldValues = {
  ticketId: "00000000-0000-0000-0000-000000000000",
  ticketCategoryId: "00000000-0000-0000-0000-000000000000",
  ticketQuery: "",
  ticketStatus: "OPEN",
  ticketPriority: "LOW",
  userId: "00000000-0000-0000-0000-000000000000",
};
  
   const NewTicket = ({navigation}) => {
         const scrollRef = useRef();
         const {userInfo} = useContext(AuthContext);
         const UserId = userInfo.userId
         
    const [values, setValues] = useState(initialFieldValues);
    const [ticket, setTicket] = useState([]);
    const [Category, setCategory] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let errors = {};
        let c1 = values.ticketCategoryId
        let p1 = values.ticketPriority
        let q1 = values.ticketQuery
      if (!c1) errors.c1= "Category is required";
      if (!p1) errors.p1 = "Priority is required";
      if (!q1) errors.q1 = "Query is required"
  
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
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
      //GetTicketDetails();
      GetTicketCategories();
      GetNewTicket();
    },
    
    []);
    useEffect(() => {
      if (recordForEdit !== null) setValues(recordForEdit);
    }, [recordForEdit]);
    
     
    const GetTicketCategories = () => {
      axios
        .get(config.APIACTIVATEURL + config.GETALLTICKETCATEGORIES)
        .then((response) => {
          setCategory(response.data.data.data);
          console.log(response.data.data.data)
        });
    };
    const handleInputChange = (name,value) => {
      setValues({...values,
        [name]:value,
    })
    }; 
    
    const handleSubmit = () => {
      if (validateForm()){
        const formData = {
          ticketId: values.ticketId,
        ticketQuery: values.ticketQuery,
        ticketStatus: values.ticketStatus,
        ticketCategoryId: values.ticketCategoryId,
        ticketPriority: values.ticketPriority,
          userId: UserId,
        };
        addOrEdit(formData); 
    }
    
  }

  const applicationAPI = () => {
    return {
        create: (newrecord) =>
            axios.post(config.APIACTIVATEURL + config.CREATETICKET, newrecord),
        update: (updateRecord) =>
            axios.put(config.APIACTIVATEURL + config.UPDATETICKET, updateRecord),
        delete: (id) => axios.delete(config.APIACTIVATEURL + config.DELETETICKET + "/" + id)
    };
};
const addOrEdit = (formData) => {
  console.log(formData)
  if (formData.ticketId === "00000000-0000-0000-0000-000000000000") {
      applicationAPI()
          .create(formData)
          .then((res) => {
              console.log(res.data)
              if (res.data.statusCode === 200) {
                  Alert.alert(res.data.data);
                  resetform();
                  GetNewTicket("1");
              }
              else {
                  Alert.alert("err2");
                  resetform();
              }
          });
  } else {
      applicationAPI()
          .update(formData)
          .then((res) => {
            console.log(res.data)
              if (res.data.statusCode === 200) {
                  Alert.alert(res.data.data);
                  resetform();
                  GetNewTicket("1");
              }
              else {
                  Alert.alert("Please fill in all the fields before submitting.");
                  resetform();
              }
          });
  }
};
    
    
    const GetNewTicket =(number) => {
      axios.get(config.APIACTIVATEURL + config.GETTICKETBYUSER+"?UserId="+`${UserId}`).then
         ((res)=>
         {
          setTicket(res.data.data.data);
          console.log(res.data.data.data);
        }
         ).catch(err=>console.log(err));
    }
     
    const DeleteTicketonCondition = (id) =>
    Alert.alert('hydroid.trawtel.com says', 'Are you sure to delete this record?', [
      {
        text: 'Cancel',  
      },
      {text: 'OK', onPress:()=> DeleteTicket(id)},
    ],
    {
      cancelable: true,
    }
    );

    const DeleteTicket =(id)=>{
       axios.delete(config.APIACTIVATEURL + config.DELETETICKET+"/"+`${id}`).then
       ((res)=>
         {
          console.log(res.data);
          if(res.data.statusCode === 200){
            Alert.alert("Ticket Deleted Successfully")
          }else{
            console.log("err")
          }
          GetNewTicket();

        }
         ).catch(err=>console.log(err));
    }

    const resetform =()=>{
      setValues(initialFieldValues);
      setErrors({})
    }
   
   const EditTicketonCondition =(data)=>{
     setRecordForEdit(data);
     scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
     console.log(data)
   }
   
  
    return (
      <ScrollView ref={scrollRef}>
      <View style={styles.page}>
        <View style={styles.form}>
          <View>
            <Text style={styles.formLabels}>Category</Text>
            <RNPickerSelect
            onValueChange={(text)=>handleInputChange('ticketCategoryId',text)}
            value={values.ticketCategoryId}
            items={Category.map(abc =>
              ({
                label:abc.ticketCategoryName,
                value:abc.ticketCategoryId
              })
              )}
            style={{color:"#088675"}}
        />
        {errors.c1 ? (
          <Text style={styles.errorText}>{errors.c1}</Text>
        ) : null}
          </View>
          <View>
            <Text style={styles.formLabels}>Priority</Text>
            <RNPickerSelect
            onValueChange={(text)=>handleInputChange('ticketPriority',text)}
            value={values.ticketPriority}
            items={[
                { label: 'LOW', value: 'LOW' },
                { label: 'MEDIUM', value: 'MEDIUM' },
                { label: 'HIGH', value: 'HIGH' },
            ]}
            style={{color:"#088675"}}
        />
        {errors.p1 ? (
          <Text style={styles.errorText}>{errors.p1}</Text>
        ) : null}
          </View>
          <View>
            <Text style={styles.formLabels}>Query</Text>
            <TextInput
              style={styles.formInput}
              value={values.ticketQuery}
              placeholder="Ticket Query"
              multiline={true}
              numberOfLines={5}
              onChangeText={(text)=>handleInputChange('ticketQuery',text)}
            />
           {errors.q1 ? (
          <Text style={styles.errorText}>{errors.q1}</Text>
        ) : null}
          </View>
          <View style={{flex:1,flexDirection:"row",margin:10}}>
      <TouchableOpacity>
      <Text 
      style = {{
      borderRadius:10,
      backgroundColor:"#405189",
      height:40,
      color:"white",
      fontSize:20,
      paddingLeft:17,
      paddingTop:5,
      paddingRight:17
      
   }} onPress={handleSubmit}>Submit</Text>
   
   </TouchableOpacity>
   <TouchableOpacity style={{marginHorizontal:10}}>
     <Text
        style = {{
          borderRadius:10,
          backgroundColor:"#f06548",
          height:40,
          color:"white",
          fontSize:20,
          paddingLeft:17,
          paddingTop:5,
          paddingRight:17
          
       }}
       onPress={resetform}
       >Cancel</Text>
      </TouchableOpacity>
      
      </View>
        </View>
        <ScrollView style={{height:"auto",backgroundColor:"#e9ebec"}}>
      <Text style={{fontSize:23,marginTop:10,marginLeft:20,fontWeight:"bold",color:"gray"}}>Tickets List</Text>
      <ScrollView>
        
        {ticket.map((xyz,index)=> <View key={xyz.ticketId}>
        <View style={{margin:10}}>
        <View style={{borderWidth:5,backgroundColor:"#daf4f0",borderColor:"white",borderRadius:20,margin:10,width:300}}>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>ID : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{index+1}</Text> </Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>TicketNo : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.ticketNo}</Text></Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>Category : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.ticketCategoryName}</Text></Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>Query : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.ticketQuery}</Text></Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>Priority : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.ticketPriority}</Text></Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>Status : <Text style={{fontSize:15,margin:10,color:"#088675",fontWeight:"400"}}>{xyz.ticketStatus}</Text></Text>
        <Text style={{fontSize:16,margin:10,color:"#088675",fontWeight:"bold"}}>Action : 
        <View style={{flex:1,flexDirection:"row"}}><Text style={{marginLeft:20}}>
       <Icon name="eye" size={25} color="#088675" style={{margin:10}} onPress={() => navigation.navigate('TicketDetails',{ id: xyz.ticketId })}></Icon></Text>
        <Text style={{marginLeft:30}}><Icon1 name="edit" size={25} color="#088675" style={{margin:10,}} onPress={()=> EditTicketonCondition(xyz)} ></Icon1></Text>
       <Text style={{marginLeft:30}}> <Icon2 name="delete" size={25} color="#A52A2A" style={{margin:10}} onPress={()=> DeleteTicketonCondition(xyz.ticketId)} ></Icon2>
        </Text>
        </View>
          </Text>
        </View>
       
        </View>
        </View>
       )}
          </ScrollView>
      
      
    </ScrollView>
      </View>
      </ScrollView>
    );
  };
  export default NewTicket;