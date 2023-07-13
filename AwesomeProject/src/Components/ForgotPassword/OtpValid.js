import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Newpassword from './Newpassword';

const OtpValid = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const route = useRoute();
  const email = route.params?.email || '';

  const validateOtp = async () => {
    try {
      const response = await fetch('https://tsk-final-backend.vercel.app/api/otpgenrator/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          enteredOTP: otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigation.navigate('Newpassword', { email: email } );
      } else {
        console.log('Request failed with status code', response.status);
      }
    } catch (error) {
      console.log(error);
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
          Validate with OTP
        </Text>

        <View>
          <Text style={styles.emaillabelStyle}>Enter the OTP (Valid up to 60 sec)</Text>
          <TextInput
            style={styles.Emailinput}
            placeholder=""
            placeholderTextColor="#8d98b0"
            onChangeText={setOtp}
            value={otp}
          />
        </View>

        <Button onPress={validateOtp} style={styles.sendOtp} mode="contained">
          Validate
        </Button>
      </View>
    </ScrollView>
  );
};

export default OtpValid;
 