import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import OtpValid from './OtpValid';

const generateOTP = async (email) => {
  try {
    const response = await fetch(`https://tsk-final-backend.vercel.app/api/otpgenrator/generate-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      // OTP sent successfully
      return true;
    } else {
      // Handle unsuccessful response (e.g., display an error message)
      console.error('Error generating OTP:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    return false;
  }
};

const EmailValid = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSendOTP = async () => {
    const otpSent = await generateOTP(email);
    if (otpSent) {
      navigation.navigate('OtpValid', { email: email }); // Navigate to the desired screen
    }
  };

  return (
    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerSecondScreen}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            fontSize: 25,
            marginTop: 80,
            marginBottom: 25,
          }}>
          Validate your account
        </Text>

        <View>
          <Text style={styles.emaillabelStyle}>Email</Text>
          <TextInput
            style={styles.Emailinput}
            placeholder=" "
            placeholderTextColor="#8d98b0"
            onChangeText={handleEmailChange} // Update the email state
          />
        </View>

        <Button onPress={handleSendOTP} style={styles.sendOtp} mode="contained">
          Send OTP
        </Button>
      </View>
    </ScrollView>
  );
};

export default EmailValid;
