import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { IconButton } from 'react-native-paper';
import Navigation from './NavigationScreen';
import RegisterScreen from './Register';
import { useValidation } from 'react-native-form-validator';


const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const LoginScreen = ({ navigation }) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { email, password },
    });
  const Validate1 = () => {
    validate({
      email: { Email: true },
      Password: { Password: true },
    });
  };
  const handleLogin=()=>{
    console.log(email,password)
    fetch('http://192.168.0.155:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {response.json()
    console.log("Print")})
    .then(response => {
      navigation.navigate('NavigationScreen')
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  // const [Password, setPassword] = useState('');
  return (
    <HideKeyboard>
      <ScrollView>
        <View style={styles.Addfullscreen}>
          <View style={styles.Loginsubscreen}>
            <TouchableOpacity
              style={{ flexDirection: 'row', marginTop: 20 }}
              onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={30} color="white" />
              <Text style={styles.AddtitleText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginSecondScreen}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                fontSize: 25,
              }}>
              Login with Email
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.emaillabelStyle}>Email</Text>
              <TextInput
                style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
                placeholder="google@gmail.com"
                // Making the Under line Transparent.
                placeholderTextColor="#8d98b0"
                //   underlineColorAndroid="transparent"
                value={email}
                onChangeText={setEmail}
              />
              {isFieldInError('date') && getErrorsInField('date').map(errorMessage => (
                <Text>{errorMessage}</Text>
              ))}
            </View>
            <Text style={styles.labelStyle}>Password</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
                placeholder="your sec password"
                // Making the Under line Transparent.
                placeholderTextColor="#8d98b0"
                //   underlineColorAndroid="transparent"
                secureTextEntry={hidePassword}

              />
              <IconButton
                icon={hidePassword ? 'eye-off' : 'eye'}
                iconColor="black"
                size={20}
                color="black"
                onPress={() => {
                  sethidePassword(!hidePassword);
                }}
              />
            </View>
            <Pressable onPress={() => navigation.navigate('EmailValid')}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'right',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                  marginTop: 10,
                }}>
                Forgot Password?
              </Text>
            </Pressable>
            <Button
              style={styles.submitBtn}
              mode="contained"
              onPress={handleLogin}>
              Log In
            </Button>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                  marginTop: 10,
                }}>
                Don't have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: '#5a55ca',
                    textDecorationLine: 'underline',
                    marginTop: 10,
                    fontFamily: 'Poppins-Medium',
                    marginLeft: 5,
                  }}>
                  Create New
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
                marginTop: 10,
              }}>
              Sign In/ Register with:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => console.warn('google Pressed')}>
                <Icon
                  name="ios-logo-google"
                  size={35}
                  color="#5a55ca"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.warn('facebook Pressed')}>
                <Icon name="ios-logo-facebook" size={35} color="#5a55ca" />
              </TouchableOpacity>
            </View>
          </View>
          {isFieldInError('date') &&
          getErrorsInField('date').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}

        </View>
        
      </ScrollView>
    </HideKeyboard>
  );
};

export default LoginScreen;