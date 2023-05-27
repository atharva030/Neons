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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { grayLine } from '../Styles/AddTaskStyle';
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
      fetch('http://192.168.29.161:8888/api/auth/createuser', {
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
          ToastAndroid.show('Registered successfully!', ToastAndroid.SHORT);
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error(error);
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

const styles = StyleSheet.create({
  Addfullscreen: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius:20
  },
  Loginsubscreen: {
    backgroundColor: '#5a55ca',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
    paddingTop: 10,
  },
  AddtitleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: 'white',
    marginLeft: 10,
  },
  registerSecondScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  roleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 50 ,
    
  },
  roleSelectionIconContainer: {
    alignItems: 'center',
    justifyContent:'space-between',
    borderColor:'gray',
    borderRadius:5,
     shadowColor:'gray',
    //  backgroundColor:'gray',
     width:100,
     height:100,
     borderWidth:1
  },
  roleSelectionText: {
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
    color: '#8d98b0',
  },
  inputContainer: {
    marginTop: 10,
    width: 280,
  },
  labelStyle: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: '#8d98b0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8d98b0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInputStyle: {
    flex: 1,
    height: 40,
  },
  submitBtn: {
    marginTop: 20,
    width: 280,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signInText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginTop: 10,
  },
  signInLink: {
    color: '#5a55ca',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  roleImageadmin: {
    width: 60,
    height:60,
    marginTop:10,
    alignItems:'center',
    justifyContent:'center'

  },
  roleImagemember:{
    width:80,
    height:70,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'red'
  },
  selectedRoleContainer: {
    backgroundColor: '#f0f0f0',
    borderColor: '#5a55ca',
    borderWidth: 2,
  },
  selectedRoleImage: {
    opacity:10
  },
  selectedRoleText: {
    color:'#5a55ca'
  }
});

export default RegisterScreen;
