import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {positionStyle} from 'react-native-flash-message';
import TaskContext from '../Context/taskContext';
import ToastComponent from '../Components/Toast/toast';
import {assets} from '../../react-native.config';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native-svg';
const handleSuccess = () => {
  ToastComponent({message: 'Login Sucessfull'});
};

const handleBackendError = () => {
  ToastComponent({message: 'Check your Network'});
};
// import Seprator from '../Components/seprator/seprator';
const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const LoginScreen = ({navigation}) => {
  const context = useContext(TaskContext);
  const [spinner, setSpinner] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {handleLogin} = context;

  const isLoginDisabled = !email.trim() || !password.trim();

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {email, password},
    });
  //This is for getting info of asyncstorage
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const data = JSON.parse(userData);

        console.log(data);
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
        ToastComponent({message: 'Please fill in all fields'});
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        'https://tsk-final-backend.vercel.app/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (!response.ok) {
        ToastComponent({message: data.error || 'Invalid email or password'});
      } else {
        handleSuccess();
        navigation.navigate('NavigationScreen');
      }
      // Login successful, perform any necessary actions (e.g., store user data, navigate to next screen)
      console.log(data.userName);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          authToken: data.authToken,
          userRole: data.userRole,
          userName: data.userName,
          userDes: data.designation,
          photoUrl: data.photoUrl,
          email: data.useremail,
          Signin_Method: data.signinMethode,
        }),
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      handleBackendError();
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const welco = () => {
    console.log('welco');
    navigation.navigate('Welcome');
  };

  return (
    <>
      {spinner ? (
        // eslint-disable-next-line react/jsx-no-undef
        <Loader />
      ) : (
        <LinearGradient
          colors={['#1e010b', '#001314']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{height: '100%'}}>
          <View>
            <HideKeyboard>
              <ScrollView>
                <View style={styles.Addfullscreen}>
                  <View style={styles.Loginsubscreen}>
                    <TouchableOpacity onPress={welco}>
                      <View style={styles.accountBack}>
                        <Icon name="chevron-back" size={30} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 25,
                    }}>
                    Login with Email
                  </Text>
                  <Text
                    style={{
                      color: '#70686a',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Please Sign In to Continue
                  </Text>
                  <View style={{marginTop: 50}}>
                    <Text style={styles.emaillabelStyle}>Email</Text>
                    <TextInput
                      style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
                      placeholder="Enter email"
                      // Making the Under line Transparent.
                      placeholderTextColor="white"
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
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
                      placeholder="Enter Password"
                      // Making the Under line Transparent.
                      placeholderTextColor="white"
                      //   underlineColorAndroid="transparent"
                      secureTextEntry={hidePassword}
                    />
                    <IconButton
                      icon={hidePassword ? 'eye-off' : 'eye'}
                      iconColor="#70686a"
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
                        color: '#70686a',
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
                    style={[
                      styles.submitBtn1,
                      isLoginDisabled && styles.buttonDisabled,
                    ]}
                    onPress={() => handlePress(email, password)}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text
                        style={[
                          styles.loginText,
                          isLoginDisabled && styles.buttonTextDisabled,
                        ]}>
                        Log In
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 13,
                        marginTop: 10,
                      }}>
                      Don't have an Account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register1')}>
                      <Text
                        style={{
                          color: '#f3c134',
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
                    style={{color: 'white', textAlign: 'center', fontSize: 13}}>
                    By using TaskStack you agree to our{' '}
                    <Text style={{fontFamily: 'Poppins-Medium'}}>
                      Terms of Services
                    </Text>{' '}
                    and{' '}
                    <Text style={{fontFamily: 'Poppins-Medium'}}>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
                {isFieldInError('date') &&
                  getErrorsInField('date').map(errorMessage => (
                    <Text>{errorMessage}</Text>
                  ))}
              </ScrollView>
            </HideKeyboard>
          </View>
        </LinearGradient>
      )}
    </>
  );
};
// it just for hr line in react native
const sepratorstyles = {
  height: 1,
  width: '100%',
  backgroundColor: '#ddd',
};
export default LoginScreen;
