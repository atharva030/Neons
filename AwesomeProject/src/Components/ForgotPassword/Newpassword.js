import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from '../../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Newpassword = ({navigation}) => {
  const route = useRoute();
  const email = route.params?.email || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // console.log(email);
  // console.log(newPassword===confirmPassword);
  const handlePasswordReset = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert(
        'Error',
        'Passwords cannot be empty. Please enter a new password.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
      return;
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters long and contain letters, numbers, and symbols.',
      );
      return;
    }

    fetch(
      'https://tsk-final-backend.vercel.app/api/auth/login/reset_password',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: confirmPassword,
        }),
      },
    )
      .then(response => {
        if (response.ok) {
          Alert.alert('Success', 'Password updated successfully');
        } else {
          throw new Error('Network Error');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      });
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
            <View style={styles.registerSecondScreen}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 25,
                  marginTop: 80,
                  marginBottom: 25,
                }}>
                Create New Password
              </Text>
              <View>
                <Text style={styles.emaillabelStyle}>Create New Password</Text>
                <TextInput
                  style={styles.Emailinput}
                  placeholder=""
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View>
                <Text style={styles.emaillabelStyle}>Confirm New Password</Text>
                <TextInput
                  style={styles.Emailinput}
                  placeholder=""
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <Button
                onPress={handlePasswordReset}
                style={styles.sendOtp}
                mode="contained">
                Create New
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Newpassword;
