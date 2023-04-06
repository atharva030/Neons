import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {IconButton} from 'react-native-paper';
import Navigation from './NavigationScreen';
import RegisterScreen from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from 'cross-fetch';

const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, sethidePassword] = useState(true);

  handleToken = async () => {
    var token = await AsyncStorage.getItem('auth');
  };
  
  const handleSubmit = async () => {
    console.log(email, password);
    fetch('http://10.70.2.180:5000/apiauth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(async responseData => {
        console.log(JSON.stringify(responseData));
        if (responseData.success) {
          //save auth-token and redirect
          AsyncStorage.setItem('auth', JSON.stringify(responseData.authToken));
          var token = await handleToken();
          navigation.navigate('NavigationScreen');
        } else {
          Alert.alert(
            'Unauthorised',
            'Please Login with a correct Credentials',
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <HideKeyboard>
      <ScrollView>
        <View style={styles.Addfullscreen}>
          <View style={styles.Loginsubscreen}>
            <TouchableOpacity
              style={{flexDirection: 'row', marginTop: 20}}
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
            <View style={{marginTop: 10}}>
              <Text style={styles.emaillabelStyle}>Email</Text>
              <TextInput
                style={styles.Emailinput}
                value={email}
                placeholderTextColor="#8d98b0"
                type="email"
                onChangeText={text => setEmail(text)}
              />
            </View>

            <Text style={styles.labelStyle}>Password</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.passwordinput}
                placeholderTextColor="#8d98b0"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={text => setPassword(text)}
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
              onPress={handleSubmit}>
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
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.warn('facebook Pressed')}>
                <Icon name="ios-logo-facebook" size={35} color="#5a55ca" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </HideKeyboard>
  );
};

export default LoginScreen;
