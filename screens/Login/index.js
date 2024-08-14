import React, {useContext, useState} from 'react';
import {Button,Text,TextInput,View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../context/AuthContext';
import styles from './styles';
import config from '../../Configurations/APIConfig';

const LoginScreen = () => {
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
      
      <Text style={styles.heading1}>HYDROID</Text>
      <Text>SMART METERING SOLUTIONS</Text>
      <Text>----------------------------------------------------</Text>
      <Text style={styles.heading2}>Welcome Back !</Text>
      <Text>Sign in to continue.</Text>
     <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.username}>Username*</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter username"
          onChangeText={text => setEmail(text)}
        />
       
       {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
        <Text style={styles.password}>Password*</Text>
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
        style={styles.btn}
          title="Login"
          onPress={() => 
            handleSubmit(username, password)
            //login(username, password);
          }
        />
        <View style={styles.bottom}>
          <Text>Don't have an account? </Text>
            <Text style={styles.link}>Contact Adminstrator</Text>
        </View>
      </View>
      </View>
    
  );
};
export default LoginScreen;