import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      
      login(username, password);
    }
  };
  return (
    <View style={styles.container}>
      
      <Text style={{fontSize:50,fontWeight:"bold",color:"black",marginTop:20}}>HYDROID</Text>
      <Text>SMART METERING SOLUTIONS</Text>
      <Text>----------------------------------------------------</Text>
      <Text style={{fontSize:20,fontWeight:600,color:"#405189",marginTop:25}}>Welcome Back !</Text>
      <Text>Sign in to continue.</Text>
      
                               
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={{fontSize:18,fontWeight:400,color:"black",marginTop:20}}>Username*</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter username"
          onChangeText={text => setEmail(text)}
        />
       
       {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
        <Text style={{fontSize:18,fontWeight:400,color:"black"}}>Password*</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
       
       {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
        <Button
        style={{color:"#0ab39c"}}
          title="Login"
          onPress={() => 
            handleSubmit(username, password)
            //login(username, password);
          }
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          
            <Text style={styles.link}>Contact Adminstrator</Text>
         
        </View>
      </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});


export default LoginScreen;