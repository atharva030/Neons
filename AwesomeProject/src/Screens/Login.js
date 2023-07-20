import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useContext } from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useValidation } from 'react-native-form-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { positionStyle } from 'react-native-flash-message';
import TaskContext from '../Context/taskContext';
import ToastComponent from '../Components/Toast/toast';
import { assets } from '../../react-native.config';
import { Image } from 'react-native-svg';
const handleSuccess = () => {
  ToastComponent({ message: 'Login Sucessfull' });
};

const handleBackendError = () => {
  ToastComponent({ message: 'Check your Network' });
};
// import Seprator from '../Components/seprator/seprator';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const LoginScreen = ({ navigation }) => {
  const context = useContext(TaskContext);
  const [spinner, setSpinner] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = context

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { email, password },
    });
    //This is for getting info of asyncstorage
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const data = JSON.parse(userData);
        } else {
          console.log('User data not found in AsyncStorage.');
        }
      } catch (error) {
        console.log('Error while retrieving user data:', error);
      }
    };
    
  // This function will be triggered when the button is pressed
  const handlePress = async (email, password) => {
    try {
      if (!email || !password) {
        ToastComponent({ message: 'Please fill in all fields' });
        return;
      }
      setIsLoading(true);
      const response = await fetch('https://tsk-final-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      setIsLoading(false);
      
      if (!response.ok) {
        ToastComponent({ message: data.error || 'Invalid email or password' });
      }
      // Login successful, perform any necessary actions (e.g., store user data, navigate to next screen)
      await AsyncStorage.setItem('user', JSON.stringify({
        authToken: data.authToken,
        userRole: data.userRole, // Assuming data.userRole contains the user's role
      }));
      handleSuccess();
      navigation.navigate('NavigationScreen');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      handleBackendError();
    }
  };

  // const [Password, setPassword] = useState('');
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <HideKeyboard>
          <ScrollView>
            <View style={styles.Addfullscreen}>

              <View style={styles.Loginsubscreen}>
                {/* <ImageBackground source={require('../assets/Image/bgapp.jpg')} resizeMode="cover"> */}
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginTop: 20 }}
                  onPress={() => navigation.goBack()}>
                  <Icon name="chevron-back" size={30} color="white" />
                  <Text style={styles.AddtitleText}>Login</Text>
                </TouchableOpacity>
                {/* </ImageBackground> */}
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
                <Text style={{ color: "grey", fontSize: 16, textAlign: 'center' }}>Please Sign In to Continue</Text>

                <View style={{ marginTop: 10 }}>
                  <Text style={styles.emaillabelStyle}>Email</Text>
                  <TextInput
                    style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
                    placeholder="Enter email"
                    // Making the Under line Transparent.
                    placeholderTextColor="#8d98b0"
                    //   underlineColorAndroid="transparent"
                    value={email}
                    onChangeText={setEmail}
                  />
                  {isFieldInError('date') &&
                    getErrorsInField('date').map(errorMessage => (
                      <Text>{errorMessage}</Text>
                    ))}
                </View>
                <Text style={styles.labelStyle}>Password</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
                    placeholder="Enter Password"
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
                {/* <Button
                  style={[
                    styles.submitBtn,
                    {backgroundColor: isLoading ? '#4caf50' : '#8bc34a'},
                  ]}
                  mode="contained"
                  onPress={toggleLoading}>
                  Log In
                </Button> */}
                <TouchableOpacity
                  style={[styles.submitBtn1, isLoading && styles.buttonDisabled]}
                  onPress={() => handlePress(email, password)}
                  disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />

                  ) : (
                    <Text style={styles.loginText}>Log In</Text>
                  )}
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
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
                {/* <Seprator/> */}
                {/* <View style={styles.lineContainer}>
                  <View style={styles.grayLine} />
                  <Text style={styles.orText}>or log in with</Text>
                  <View style={styles.grayLine} />
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => console.warn('google Pressed')}>
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
                </View> */}
                <Text style={{ color: "black", textAlign: "center", fontSize: 13 }}>By using TaskStack you agree to our <Text style={{ fontFamily: 'Poppins-Medium' }}>Terms of Services</Text> and <Text style={{ fontFamily: 'Poppins-Medium' }}>Privacy Policy</Text></Text>
              </View>
              {isFieldInError('date') &&
                getErrorsInField('date').map(errorMessage => (
                  <Text>{errorMessage}</Text>
                ))}
            </View>
          </ScrollView>
        </HideKeyboard>
      )}
    </>
  );
};
// it just for hr line in react native 
const sepratorstyles = {
  height: 1,
  width: '100%',
  backgroundColor: '#ddd',
}



export default LoginScreen;
