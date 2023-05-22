import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, IconButton} from 'react-native-paper';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [hidecnfPassword, sethidecnfPassword] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');

  const handleSubmitRegister = () => {
    console.log(name,email,password, phone,role)
    if(password===cnfpassword){
      setSpinner(true);
    fetch('http://172.20.10.5:8888/api/auth/createuser', {
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
      .then(async response => {
        res = await response.json();
        console.log(res);
        await AsyncStorage.setItem('auth-token', res.authToken);
        auth = await AsyncStorage.getItem('auth-token');
        console.log(auth);
        setSpinner(false);
        ToastAndroid.show('Registered successfully!', ToastAndroid.SHORT);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
    }
    else{
      console.log("password Not Matched")
    }
  };

  return (
    <>
    {spinner ? (<Loader/>):(
      <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 20}}
          onPress={() => navigation.navigate('Welcome')}>
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerSecondScreen}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            fontSize: 25,
            marginTop: 10,
            marginBottom: 15,
          }}>
          Create a new Account
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.emaillabelStyle}>Full Name</Text>
          <TextInput
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View
          style={{
            width: 280,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{width: 138}}>
            <Text style={styles.emaillabelStyle}>Phone</Text>
            <TextInput
              style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              placeholderTextColor="#8d98b0"
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
          <View style={{width: 138}}>
            <Text style={styles.emaillabelStyle}>Choose your Role</Text>
            <TextInput
              style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              // Making the Under line Transparent.
              placeholderTextColor="#8d98b0"
              //   underlineColorAndroid="transparent"
              value={role}
              onChangeText={text => setRole(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.emaillabelStyle}>Email</Text>
          <TextInput
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <Text style={styles.labelStyle}>Password</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            placeholderTextColor="#8d98b0"
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
        <View style={{marginTop: 10}}>
          <Text style={styles.labelStyle}>Confirm Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
              value={cnfpassword}
              onChangeText={text => setCnfPassword(text)}
              placeholderTextColor="#8d98b0"
              secureTextEntry={hidecnfPassword}
            />
            <IconButton
              icon={hidecnfPassword ? 'eye-off' : 'eye'}
              iconColor="black"
              size={20}
              color="black"
              onPress={() => {
                sethidecnfPassword(!hidecnfPassword);
              }}
            />
          </View>
        </View>
        <Button
          onPress={handleSubmitRegister}
          style={styles.submitBtn}
          mode="contained">
          Register
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              marginTop: 10,
            }}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#5a55ca',
                textDecorationLine: 'underline',
                marginTop: 10,
                fontFamily: 'Poppins-Medium',
                marginLeft: 5,
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            marginTop: 10,
          }}>
          Sign In/ Register with:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => console.warn('google Pressed')}>
            <Icon
              name="ios-logo-google"
              size={35}
              color="#5a55ca"
              style={{marginRight: 10}}
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
