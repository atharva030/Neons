import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, IconButton, shadow } from 'react-native-paper';
import styles  from '../Styles/registerstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
// import { grayLine } from '../Styles/AddTaskStyle'
import ToastComponent from '../Components/Toast/toast';

const handleSuccess = () => {
    ToastComponent({ message: 'Registration Sucessfull' });
  };

  const handleBackendError = () => {
    ToastComponent({ message: '⚠️ Please Try again later!' });
  };;
const RegisterScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCnfPassword, setHideCnfPassword] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const handleSubmitRegister = () => {
    console.log(name, email, password, phone, role);
    if (password === cnfpassword) {
      setSpinner(true);
      fetch('http://192.168.43.60:8888/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          userRole: role,
          password: password,
        }),
      })
        .then(async (response) => {
          const res = await response.json();
          console.log(res);
          await AsyncStorage.setItem('auth-token', res.authToken);
          const auth = await AsyncStorage.getItem('auth-token');
          console.log(auth);
          setSpinner(false);
          handleSuccess()
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error(error);
          handleBackendError()
        });
    } else {
      console.log('Password Not Matched');
    }
  };
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    console.log(role)
  };
  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <ScrollView style={styles.Addfullscreen}>
          <View style={styles.Loginsubscreen}>
            <TouchableOpacity
              style={{ flexDirection: 'row', marginTop: 20 }}
              onPress={() => navigation.navigate('Welcome')}
            >
              <Icon name="chevron-back" size={30} color="white" />
              <Text style={styles.AddtitleText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerSecondScreen}>
            <Text style={styles.titleText}>Create a new Account</Text>
            <View style={styles.roleSelectionContainer}>
              <TouchableOpacity
                style={[
                  styles.roleSelectionIconContainer,
                  selectedRole === 'admin' && styles.selectedRoleContainer,
                ]}
                onPress={() => handleRoleSelection('admin')}
              >
                <Image
                  source={require('../../assets/admin.png')}
                  style={[
                    styles.roleImageadmin,
                    selectedRole === 'admin' && styles.selectedRoleImage,
                  ]}
                />
                <Text
                  style={[
                    styles.roleSelectionText,
                    selectedRole === 'admin' && styles.selectedRoleText,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleSelectionIconContainer,
                  selectedRole === 'member' && styles.selectedRoleContainer,
                ]}
                onPress={() => handleRoleSelection('member')}
              >
                <Image
                  source={require('../../assets/member.png')}
                  style={[
                    styles.roleImagemember,
                    selectedRole === 'member' && styles.selectedRoleImage,
                  ]}
                />
                <Text
                  style={[
                    styles.roleSelectionText,
                    selectedRole === 'member' && styles.selectedRoleText,
                  ]}
                >
                  Member
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Full Name</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder=""
                placeholderTextColor="#8d98b0"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Phone</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder=""
                placeholderTextColor="#8d98b0"
                value={phone}
                onChangeText={text => setPhone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder=""
                placeholderTextColor="#8d98b0"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInputStyle}
                  value={password}
                  onChangeText={setPassword}
                  placeholder=""
                  placeholderTextColor="#8d98b0"
                  secureTextEntry={hidePassword}
                />
                <IconButton
                  icon={hidePassword ? 'eye-off' : 'eye'}
                  color="black"
                  size={20}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Confirm Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInputStyle}
                  value={cnfpassword}
                  onChangeText={text => setCnfPassword(text)}
                  placeholderTextColor="#8d98b0"
                  secureTextEntry={hideCnfPassword}
                />
                <IconButton
                  icon={hideCnfPassword ? 'eye-off' : 'eye'}
                  color="black"
                  size={20}
                  onPress={() => setHideCnfPassword(!hideCnfPassword)}
                />
              </View>
            </View>
            <Button
              onPress={handleSubmitRegister}
              style={styles.submitBtn}
              mode="contained"
            >
              Register
            </Button>
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInLink}>Log In</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.signInText}>Sign In/ Register with:</Text>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity onPress={() => console.warn('google Pressed')}>
                <Icon
                  name="ios-logo-google"
                  size={35}
                  color="#5a55ca"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.warn('facebook Pressed')}>
                <Icon name="ios-logo-facebook" size={35} color="#5a55ca" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};



export default RegisterScreen;
