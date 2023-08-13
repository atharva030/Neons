import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import OtpValid from './OtpValid';
import LinearGradient from 'react-native-linear-gradient';
const generateOTP = async email => {
  try {
    const response = await fetch(
      `https://tsk-final-backend.vercel.app/api/otpgenrator/generate-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      },
    );

    if (response.status === 200) {
      // OTP sent successfully
      return true;
    } else {
      // Handle unsuccessful response (e.g., display an error message)
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
      console.error('Error generating OTP:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    return false;
  }
};

const EmailValid = ({navigation}) => {
  const [email, setEmail] = useState('');
  const isSendOTPDisabled = !email.trim();

  const handleEmailChange = value => {
    setEmail(value);
  };

  const handleSendOTP = async () => {
    if (!email.trim()) {
      // Show a toaster if the email field is empty or contains only whitespace characters
      ToastAndroid.show('Email is required', ToastAndroid.SHORT);
      return;
    }

    const otpSent = await generateOTP(email);
    if (otpSent) {
      navigation.navigate('OtpValid', {email: email}); // Navigate to the desired screen
    }
  };

  return (
    <LinearGradient
      colors={['#1e010b', '#001314']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{height: '100%'}}>
      <View>
        <ScrollView>
          <View style={styles.Addfullscreen}>
            <View style={styles.Loginsubscreen}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
              Validate your account
            </Text>
            <View style={{paddingTop: 80}}>
              <Text style={styles.emaillabelStyle}>Email</Text>
              <View style={{marginTop: 20}}>
                <TextInput
                  style={[styles.Emailinput]}
                  placeholder="Enter your Email "
                  placeholderTextColor="white"
                  onChangeText={handleEmailChange} 
                  value={email} 
                />
              </View>
            </View>
            <Button
              onPress={handleSendOTP}
              style={[
                styles.sendOtp,
                isSendOTPDisabled && styles.buttonDisabled,
              ]}
              mode="contained"
              disabled={isSendOTPDisabled}>
              <Text
                style={[
                  styles.sendBtnText,
                  isSendOTPDisabled && styles.buttonTextDisabled,
                ]}>
                Send OTP
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default EmailValid;
