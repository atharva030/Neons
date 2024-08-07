import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Newpassword from './Newpassword';
import LinearGradient from 'react-native-linear-gradient';

const OtpValid = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // Timer in seconds
  const route = useRoute();
  const email = route.params?.email || '';

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      backHandler.remove();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Timer has expired
      Alert.alert(
        'Time Expired',
        'The OTP validation time has expired. Please request a new OTP.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('EmailValid'), // Navigate back to the EmailValid page
          },
        ],
      );
    }
  }, [timer, navigation]);

  const handleBackPress = () => {
    Alert.alert('Confirm', 'Are you sure you want to leave this page?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Leave',
        onPress: () => navigation.navigate('Login'), // Navigate back to the EmailValid page
      },
    ]);

    // Return true to indicate that we have handled the back press
    return true;
  };

  const validateOtp = async () => {
    try {
      const response = await fetch(
        'https://tsk-final-backend.vercel.app/api/otpgenrator/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            enteredOTP: otp,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        navigation.navigate('Newpassword', {email: email});
      } else {
        console.log('Request failed with status code', response.status);
      }
    } catch (error) {
      console.log(error);
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
              Validate the OTP
            </Text>

            <View>
              <Text style={styles.emaillabelStyle}>
                Enter the OTP (Valid up to {timer} sec)
              </Text>
              <TextInput
                style={styles.Emailinput}
                placeholder="Fill the OTP"
                placeholderTextColor="white"
                onChangeText={setOtp}
                value={otp}
              />
            </View>

            <Button
              onPress={validateOtp}
              style={styles.sendOtp}
              mode="contained">
              Validate
            </Button>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default OtpValid;
