import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import OtpValid from './OtpValid';

const EmailValid = ({navigation}) => {
  return (
    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity style={{flexDirection: 'row', marginTop: 20}}>
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
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            // Making the Under line Transparent.
            placeholderTextColor="#8d98b0"
            //   underlineColorAndroid="transparent"
          />
        </View>

        <Button
          onPress={() => navigation.navigate('OtpValid')}
          style={styles.sendOtp}
          mode="contained">
          Send OTP
        </Button>
      </View>
    </ScrollView>
  );
};

export default EmailValid;
